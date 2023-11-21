"use client";

import {
	Divider,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Chip,
} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/services/supabaseClient";
import { useAuth, useUser, useOrganization } from "@clerk/nextjs";
import {
	FaXTwitter,
	FaFacebook,
	FaInstagram,
	FaLinkedinIn,
	FaTiktok,
} from "react-icons/fa6";

export default function Page() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;
	const { getToken } = useAuth();
	const { isSignedIn, user, isLoaded } = useUser();
	const { organization } = useOrganization();
	const [brand, setBrand] = useState<any>(null);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [brandDeleteConfirm, setBrandDeleteConfirm] = useState<string>("");
	const [brandDeleteConfirmError, setBrandDeleteConfirmError] = useState<
		string | null
	>(null);
	const [brandName, setBrandName] = useState<string>("");
	const [brandDescription, setBrandDescription] = useState<string>("");
	const [brandDomain, setBrandDomain] = useState<string>("");
	const [brandKeywords, setBrandKeywords] = useState<string>("");
	const [brandSocialMedia, setBrandSocialMedia] = useState<any>(null);

	const socialMediaPlatforms = [
		"facebook",
		"twitter",
		"instagram",
		"linkedin",
		"tiktok",
	];

	useEffect(() => {
		if (id && isSignedIn === true && isLoaded === true) {
			handleFetchDataBrand();
		}
	}, [isSignedIn, isLoaded, id]);

	const handleFetchDataBrand = async () => {
		if (id !== null) {
			const supabaseAccessToken = await getToken({
				template: "supabase",
			});

			const supabase = await supabaseClient(
				supabaseAccessToken as string
			);

			if (id === null) {
				router.push("/dashboard");
			} else {
				const { data, error } = await supabase
					.from("brands")
					.select("*")
					.eq("slug", id)
					.single();
				if (error) {
					router.push("/dashboard");
				} else {
					setBrand(data);
					setBrandName(data.name);
					setBrandDescription(data.description);
					setBrandDomain(data.domain);
					setBrandKeywords(data.keywords);
					setBrandSocialMedia(data.social_media);
				}
			}
		}
	};

	const handleDeleteBrand = async () => {
		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);

		const { error } = await supabase
			.from("brands")
			.delete()
			.eq("slug", id)
			.single();

		if (error) {
			console.log(error);
		} else {
			router.push("/dashboard");
		}
	};

	const handleBrandDeleteConfirm = () => {
		if (brandDeleteConfirm === brand?.name) {
			handleDeleteBrand();
		} else {
			setBrandDeleteConfirmError("Brand name does not match");
		}
	};

	const handleBrandUpdate = async () => {
		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);

		const { error } = await supabase
			.from("brands")
			.update({
				name: brandName,
				description: brandDescription,
				domain: brandDomain,
				keywords: brandKeywords,
				social_media: brandSocialMedia,
			})
			.eq("slug", id)
			.single();

		if (error) {
			console.log(error);
		} else {
			router.push("/dashboard");
		}
	};

	return (
		<>
			<div className="flex flex-1 flex-col gap-8">
				<Card className="border border-default-200 bg-default-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<p className="text-xl">Brand Name</p>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							<Input
								classNames={{
									inputWrapper: "!border",
								}}
								color="success"
								type="text"
								variant="bordered"
								value={brandName || "Loading..."} // Change here
								onChange={(e) => {
									setBrandName(e.target.value);
								}}
							/>
							<p className="text-sm text-warning-300">
								Note: Be aware this won&apos;t change your
								brands knowledge base. You&apos;ll have to
								change that manually.
							</p>
						</div>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end px-5">
						<Button
							color="success"
							variant="ghost"
							onClick={() => handleBrandUpdate()}
						>
							Save
						</Button>
					</CardFooter>
				</Card>

				<Card className="border border-default-200 bg-default-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<p className="text-xl">Brand Description</p>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							<Input
								classNames={{
									inputWrapper: "!border",
								}}
								color="success"
								type="text"
								variant="bordered"
								value={brandDescription || "Loading..."}
								onChange={(e) => {
									setBrandDescription(e.target.value);
								}}
							/>
							<p className="text-sm text-warning-300">
								Note: Be aware this won&apos;t change your
								brands knowledge base. You&apos;ll have to
								change that manually.
							</p>
						</div>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end px-5">
						<Button
							color="success"
							variant="ghost"
							onPress={() => handleBrandUpdate()}
						>
							Save
						</Button>
					</CardFooter>
				</Card>

				<Card className="border border-default-200 bg-default-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<p className="text-xl">Brand Domain</p>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							<Input
								classNames={{
									inputWrapper: "!border",
								}}
								color="success"
								type="text"
								variant="bordered"
								value={brandDomain || "Loading..."}
								onChange={(e) => {
									setBrandDomain(e.target.value);
								}}
							/>
							<p className="text-sm text-warning-300">
								Note: Be aware this won&apos;t change your
								brands knowledge base. You&apos;ll have to
								change that manually.
							</p>
						</div>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end px-5">
						<Button
							color="success"
							variant="ghost"
							onPress={() => handleBrandUpdate()}
						>
							Save
						</Button>
					</CardFooter>
				</Card>

				<Card className="border border-default-200 bg-default-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<p className="text-xl">Brand Keywords</p>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							<Input
								classNames={{
									inputWrapper: "!border",
								}}
								color="success"
								type="text"
								variant="bordered"
								value={brandKeywords || "Loading..."}
								onChange={(e) => {
									setBrandKeywords(e.target.value);
								}}
							/>
							<p className="text-sm text-warning-300">
								Note: Be aware this won&apos;t change your
								brands knowledge base. You&apos;ll have to
								change that manually.
							</p>
						</div>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end px-5">
						<Button
							color="success"
							variant="ghost"
							onPress={() => handleBrandUpdate()}
						>
							Save
						</Button>
					</CardFooter>
				</Card>

				<Card className="border border-default-200 bg-default-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<p className="text-xl">Brand Social Media</p>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							{socialMediaPlatforms.map((platform) => (
								<Input
									key={platform}
									classNames={{ inputWrapper: "!border" }}
									color="success"
									type="text"
									variant="bordered"
									startContent={
										<span className="text-success">
											{platform === "facebook" && (
												<FaFacebook />
											)}
											{platform === "twitter" && (
												<FaXTwitter />
											)}
											{platform === "instagram" && (
												<FaInstagram />
											)}
											{platform === "linkedin" && (
												<FaLinkedinIn />
											)}
											{platform === "tiktok" && (
												<FaTiktok />
											)}
										</span>
									}
									value={
										brand?.social_media?.[platform] || ""
									}
									onChange={(e) => {
										setBrandSocialMedia({
											...brandSocialMedia,
											[platform]: e.target.value,
										});
									}}
								/>
							))}
							<p className="text-sm text-warning-300">
								Note: Be aware this won&apos;t change your
								brands knowledge base. You&apos;ll have to
								change that manually.
							</p>
						</div>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end px-5">
						<Button
							color="success"
							variant="ghost"
							onPress={() => handleBrandUpdate()}
						>
							Save
						</Button>
					</CardFooter>
				</Card>

				<Card className="border border-danger-200 bg-default-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<p className="text-xl text-danger">Delete Brand</p>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<p>
							The brand will be permanently deleted, including all
							of its data. This action is irreversible and can not
							be undone.
						</p>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end bg-danger-200/50 px-5">
						<Button onPress={onOpenChange} color="danger">
							Delete
						</Button>
					</CardFooter>
				</Card>
			</div>
			<Modal
				backdrop="opaque"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				classNames={{
					backdrop:
						"bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Delete Brand
							</ModalHeader>
							<ModalBody>
								<p>
									This brand will be permanently deleted,
									along with all of its knowledge base, files,
									chat history.
								</p>
								<Chip
									radius="full"
									color="danger"
									variant="shadow"
								>
									<span>Warning:</span> This action is not
									reversible. Please be certain.
								</Chip>
								<Input
									key="outside"
									type="text"
									label="Type your brand name to confirm"
									labelPlacement="outside"
									placeholder={brand?.name}
									onChange={(e) => {
										setBrandDeleteConfirm(e.target.value);
									}}
									value={brandDeleteConfirm}
								/>
								{brandDeleteConfirmError && (
									<p className="text-danger">
										{brandDeleteConfirmError}
									</p>
								)}
							</ModalBody>
							<ModalFooter>
								<Button
									color="success"
									variant="light"
									onPress={onClose}
									placeholder={brand?.name}
								>
									Close
								</Button>
								<Button
									color="danger"
									onPress={handleBrandDeleteConfirm}
								>
									Confirm Delete
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
