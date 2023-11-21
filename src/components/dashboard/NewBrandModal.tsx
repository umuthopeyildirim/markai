"use client";

import { useState, FC } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Card,
	CardBody,
} from "@nextui-org/react";
import { BsBuildingFillAdd, BsBuildingFillDown } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface NewBrandModalProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}

// Note for mantainers: This component is not used in the app yet.
const NewBrandModal: FC<NewBrandModalProps> = ({ isOpen, onOpenChange }) => {
	const [newBrandSelection, setNewBrandSelection] = useState<
		"add" | "create" | "error" | null
	>(null);
	const router = useRouter();

	const handleBrandSelection = () => {
		if (newBrandSelection === "add") {
			router.push("/brands/add");
		} else if (newBrandSelection === "create") {
			router.push("/brands/new");
		} else {
			setNewBrandSelection("error");
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size="lg"
			classNames={{
				backdrop:
					"bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
			}}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							New Brand
						</ModalHeader>
						<ModalBody>
							<div className="flex flex-col gap-4 md:flex-row">
								<Card
									isPressable={true}
									isHoverable={true}
									shadow="lg"
									fullWidth={true}
									className={`${
										newBrandSelection === "add"
											? "bg-success text-white hover:!bg-success-300"
											: ""
									}`}
									onPress={() => {
										setNewBrandSelection("add");
									}}
								>
									<CardBody>
										<div className="flex flex-col items-center justify-center">
											<BsBuildingFillDown
												size={50}
												className="text-6xl"
											/>
											<p className="mt-2 text-lg text-default-700 ">
												Add a new brand
											</p>
										</div>
									</CardBody>
								</Card>
								<Card
									isDisabled={true}
									isHoverable={true}
									isPressable={true}
									shadow="lg"
									fullWidth={true}
									className={`${
										newBrandSelection === "create"
											? "bg-success text-white hover:!bg-success-300"
											: ""
									}`}
								>
									<CardBody>
										<div className="flex flex-col items-center justify-center">
											<BsBuildingFillAdd
												size={50}
												className="text-6xl"
											/>
											<p className="mt-2 text-lg text-default-700 ">
												Create a new brand
											</p>
										</div>
									</CardBody>
								</Card>
							</div>
							<div>
								{newBrandSelection === "error" && (
									<p className="text-danger">
										Please select an option
									</p>
								)}
							</div>
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
								onPress={handleBrandSelection}
							>
								Proceed
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default NewBrandModal;
