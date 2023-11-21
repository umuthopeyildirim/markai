"use client";

import { Card, CardBody } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

function NewBrandCard() {
	const router = useRouter();
	return (
		<Card
			className="min-h-[440px] min-w-[350px]"
			isHoverable={true}
			isPressable={true}
			shadow="lg"
			fullWidth={true}
			onPress={() => router.push("/brands/add")}
		>
			<CardBody>
				<div className="flex h-full flex-col items-center justify-center">
					<FaPlus size={25} className="text-6xl text-success" />
					<p className="mt-10 text-lg text-default-700 ">
						Add a new brand
					</p>
				</div>
			</CardBody>
		</Card>
	);
}

export default NewBrandCard;
