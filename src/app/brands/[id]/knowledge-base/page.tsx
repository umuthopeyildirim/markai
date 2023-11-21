"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	Pagination,
	Selection,
	ChipProps,
	SortDescriptor,
	Spinner,
	Link,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";
import { columns, statusOptions } from "./data";
import { capitalize, formatDateAgo } from "./utils";
import {
	BsThreeDotsVertical,
	BsSearch,
	BsArrowDownShort,
} from "react-icons/bs";
import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai";
import { useUser, useOrganization, useAuth } from "@clerk/nextjs";
import { supabaseClient } from "@/services/supabaseClient";
import { fileFromPath } from "openai";

// TODO: Add Table, Search, Pagination, Filter, Dropdown Button, Upload Modal and settings modal
const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	error: "danger",
	loading: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
	"name",
	"type",
	"status",
	"created_at",
	"actions",
];

type Knowledge = {
	id: number;
	name: string;
	type: string;
	status: string;
	bucket_url: string;
	brand_id: number;
	created_at: string;
	user_id: string;
	org_id: string;
};

export default function BrandKnowledgeBasePage({
	params,
}: {
	params: { id: string };
}) {
	const { getToken } = useAuth();
	const { isSignedIn, user, isLoaded } = useUser();
	const { organization } = useOrganization();

	// Request to get all knowledge base for the brand
	const [brand, setBrand] = useState<any>({} as any);
	const [knowledges, setKnowledges] = useState<any[]>([]);

	const [loadingState, setLoadingState] = useState<"loading" | "idle">(
		"loading"
	);
	const [filterValue, setFilterValue] = useState("");
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
	const [visibleColumns, setVisibleColumns] = useState<Selection>(
		new Set(INITIAL_VISIBLE_COLUMNS)
	);
	const [statusFilter, setStatusFilter] = useState<Selection>("all");
	const [rowsPerPage, setRowsPerPage] = useState(15);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "age",
		direction: "ascending",
	});
	const [fileName, setFileName] = useState<string>("");
	const [fileContent, setFileContent] = useState<string>("");
	const [fileType, setFileType] = useState<string>("");

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	// This will run only once after the component is mounted and user is loaded
	useEffect(() => {
		if (user) {
			handleGetCurrentBrandDetails();
		}
	}, [user]);

	// This will run whenever 'brand' changes and is not null or undefined
	useEffect(() => {
		if (brand) {
			handleGetKnowledgeBase();
		}
	}, [brand]);

	const handleGetCurrentBrandDetails = async () => {
		setLoadingState("loading");
		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);
		const { data, error } = await supabase
			.from("brands")
			.select("*")
			.eq("slug", params.id);
		if (error) {
			console.log(error);
		}
		if (data) {
			setBrand(data[0]);
		}
	};

	const handleDeleteKnowledgeBase = async (id: number) => {
		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);
		const { data, error } = await supabase
			.from("knowledge_base")
			.delete()
			.eq("id", id);
		if (error) {
			console.log(error);
		} else {
			handleRefreshKnowledgeBase();
		}
	};

	const handleNewKnowledgeBase = async () => {
		// TODO: Error handling for file input etc
		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);
		const { data, error } = await supabase
			.from("knowledge_base")
			.insert([
				{
					name: fileName,
					type: fileType,
					bucket_url: "",
					brand_id: brand?.id,
					user_id: user?.id,
					org_id: organization?.id,
					status: "active",
				},
			])
			.select();
		if (error) {
			console.log(error);
		} else {
			const { brand_id, knowledge_id } = data[0];
			const apiResponse = await fetch("/api/ingest", {
				method: "POST",
				body: JSON.stringify({
					name: fileName,
					content: fileContent,
					brand_id: params.id,
					knowledge_id,
				}),
			});
			console.log(apiResponse);
			handleRefreshKnowledgeBase();
		}
	};

	const handleRefreshKnowledgeBase = () => {
		// Refresh knowledge base
		setLoadingState("loading");
		setKnowledges([]);
		handleGetKnowledgeBase();
	};

	const previewFile = (file: File) => {
		const reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (event) {
			setFileName(file.name);
			setFileType(file.type);
			setFileContent(event.target?.result as string);
		};
		reader.onerror = function (event) {
			console.log("Error: " + event.target?.error);
		};
	};

	const handleGetKnowledgeBase = async () => {
		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);
		const { data, error } = await supabase
			.from("knowledge_base")
			.select("*")
			.eq("brand_id", brand?.id)
			.order("created_at", { ascending: false });
		if (error) {
			console.log(error);
		}
		if (data) {
			setKnowledges(data);
			setLoadingState("idle");
		}
	};

	const [page, setPage] = useState(1);

	const pages = Math.ceil(knowledges.length / rowsPerPage);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [visibleColumns]);

	const filteredItems = useMemo(() => {
		let filteredKnowledge = [...knowledges];

		if (hasSearchFilter) {
			filteredKnowledge = filteredKnowledge.filter((knowledge) =>
				knowledge.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (
			statusFilter !== "all" &&
			Array.from(statusFilter).length !== statusOptions.length
		) {
			filteredKnowledge = filteredKnowledge.filter((knowledge) =>
				Array.from(statusFilter).includes(knowledge.status)
			);
		}

		return filteredKnowledge;
	}, [knowledges, filterValue, statusFilter]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = useMemo(() => {
		return [...items].sort((a: Knowledge, b: Knowledge) => {
			const first = a[sortDescriptor.column as keyof Knowledge] as number;
			const second = b[
				sortDescriptor.column as keyof Knowledge
			] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = useCallback(
		(knowledges: Knowledge, columnKey: React.Key) => {
			const cellValue = knowledges[columnKey as keyof Knowledge];

			switch (columnKey) {
				case "name":
					return (
						// Add remote file link
						<Link
							className="text-foreground hover:text-success"
							href={knowledges.bucket_url}
							target="_blank"
						>
							{knowledges.name}
						</Link>
					);
				case "status":
					return (
						<Chip
							className="gap-1 border-none capitalize text-default-600"
							color={statusColorMap[knowledges.status]}
							size="sm"
							variant="dot"
						>
							{cellValue}
						</Chip>
					);
				case "created_at":
					return (
						<p className="text-small text-default-400">
							{formatDateAgo(knowledges.created_at)}
						</p>
					);
				case "actions":
					return (
						<div className="relative flex items-center justify-end gap-2">
							<Dropdown className="border-1 border-default-200 bg-background">
								<DropdownTrigger>
									<Button
										isIconOnly
										radius="full"
										size="sm"
										variant="light"
									>
										<BsThreeDotsVertical className="text-default-400" />
									</Button>
								</DropdownTrigger>
								<DropdownMenu>
									{/* View should open a new tab with {name.bucket_url} */}
									<DropdownItem
										onClick={() =>
											window.open(
												knowledges.bucket_url,
												"_blank"
											)
										}
									>
										View
									</DropdownItem>
									<DropdownItem
										className="text-danger hover:text-danger"
										onClick={() =>
											handleDeleteKnowledgeBase(
												knowledges.id
											)
										}
									>
										Delete
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					);
				default:
					return cellValue;
			}
		},
		[]
	);

	const onRowsPerPageChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[]
	);

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex h-10 items-end justify-between gap-3">
					<Input
						isClearable
						classNames={{
							base: "w-full sm:max-w-[44%]",
							inputWrapper: "border-1",
						}}
						placeholder="Search by name..."
						size="lg"
						startContent={<BsSearch className="text-default-300" />}
						value={filterValue}
						variant="bordered"
						onClear={() => setFilterValue("")}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Button
							isIconOnly
							radius="full"
							size="lg"
							variant="flat"
							onClick={handleRefreshKnowledgeBase}
							isDisabled={loadingState === "loading"}
						>
							<AiOutlineReload
								className={
									loadingState === "idle"
										? "animate-none"
										: "animate-spin"
								}
							/>
						</Button>

						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={
										<BsArrowDownShort className="text-small" />
									}
									size="lg"
									variant="flat"
								>
									Status
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={statusFilter}
								selectionMode="multiple"
								onSelectionChange={setStatusFilter}
							>
								{statusOptions.map((status) => (
									<DropdownItem
										key={status.uid}
										className="capitalize"
									>
										{capitalize(status.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={
										<BsArrowDownShort className="text-small" />
									}
									size="lg"
									variant="flat"
								>
									Columns
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={setVisibleColumns}
							>
								{columns.map((column) => (
									<DropdownItem
										key={column.uid}
										className="capitalize"
									>
										{capitalize(column.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button
							className="bg-foreground text-background"
							endContent={<AiOutlinePlus />}
							size="lg"
							onPress={onOpen}
						>
							Add New
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-small text-default-400">
						Total {knowledges.length} knowledge base
					</span>
					<label className="flex items-center text-small text-default-400">
						Rows per page:
						<select
							className="bg-transparent text-small text-default-400 outline-none"
							onChange={onRowsPerPageChange}
						>
							<option value="15">15</option>
							<option value="30">30</option>
							<option value="100">100</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [
		filterValue,
		statusFilter,
		visibleColumns,
		onSearchChange,
		onRowsPerPageChange,
		knowledges.length,
		hasSearchFilter,
	]);

	const bottomContent = useMemo(() => {
		return (
			<div className="flex items-center justify-between px-2 py-2">
				<Pagination
					showControls
					classNames={{
						cursor: "bg-foreground text-background",
					}}
					color="default"
					isDisabled={hasSearchFilter}
					page={page}
					total={pages}
					variant="light"
					onChange={setPage}
				/>
				<span className="text-small text-default-400">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${items.length} selected`}
				</span>
			</div>
		);
	}, [selectedKeys, items.length, page, pages, hasSearchFilter]);

	const classNames = useMemo(
		() => ({
			wrapper: ["max-h-[382px]", "max-w-3xl"],
			th: [
				"bg-transparent",
				"text-default-500",
				"border-b",
				"border-divider",
			],
			td: [
				// changing the rows border radius
				// first
				"group-data-[first=true]:first:before:rounded-none",
				"group-data-[first=true]:last:before:rounded-none",
				// middle
				"group-data-[middle=true]:before:rounded-none",
				// last
				"group-data-[last=true]:first:before:rounded-none",
				"group-data-[last=true]:last:before:rounded-none",
			],
		}),
		[]
	);

	return (
		<>
			<div className="m-5 flex flex-1 flex-col">
				<Table
					isCompact
					removeWrapper
					aria-label="Example table with custom cells, pagination and sorting"
					bottomContent={bottomContent}
					bottomContentPlacement="outside"
					checkboxesProps={{
						classNames: {
							wrapper:
								"after:bg-foreground after:text-background text-background",
						},
					}}
					classNames={classNames}
					selectedKeys={selectedKeys}
					selectionMode="multiple"
					sortDescriptor={sortDescriptor}
					topContent={topContent}
					topContentPlacement="outside"
					onSelectionChange={setSelectedKeys}
					onSortChange={setSortDescriptor}
				>
					<TableHeader columns={headerColumns}>
						{(column) => (
							<TableColumn
								key={column.uid}
								align={
									column.uid === "actions"
										? "center"
										: "start"
								}
								allowsSorting={column.sortable}
							>
								{column.name}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody
						emptyContent={"No knowledge found! 🧐"}
						items={sortedItems}
						loadingContent={<Spinner color="success" />}
						loadingState={loadingState}
					>
						{(item) => (
							<TableRow key={item.id}>
								{(columnKey) => (
									<TableCell>
										{renderCell(item, columnKey)}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Upload Knowledge
							</ModalHeader>
							<ModalBody>
								<p>
									We are currently supporting only TXT, MD and
									HTML. We plan to bring more formats in the
									future.
								</p>
								<input
									type="file"
									accept=".txt,.md,.html"
									onChange={(e) => {
										if (e.target.files) {
											previewFile(e.target.files[0]);
										}
									}}
								></input>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									color="success"
									onPress={() => {
										handleNewKnowledgeBase();
										onClose();
									}}
								>
									Submit to Knowledge Base
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
