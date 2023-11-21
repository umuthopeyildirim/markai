"use client";

import { FC } from "react";
import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { FaMap } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { formatDateAgo } from "@/services/formatDateAgo";
type BrandCardProps = {
	brand: {
		id: string;
		name: string;
		description: string;
		slug: string;
		created_at: string;
	};
};

const BrandCard: FC<BrandCardProps> = ({ brand }) => {
	const router = useRouter();

	return (
		<Card
			key={brand.id}
			className="min-h-[440px]"
			isHoverable={true}
			isPressable={true}
			shadow="lg"
			fullWidth={true}
			onPress={() => {
				router.push("/brands/" + brand.slug);
			}}
		>
			<div className="flex h-1/2 w-full items-center justify-center bg-success text-white">
				<p className="text-center font-bold">{brand.name}</p>
			</div>
			<CardBody className="h-1/2">
				<div className="flex h-full flex-col">
					<div className="basis-3/4">
						<p className="text-xl">{brand.name}</p>
						<p className="text-base text-success">
							{brand.description}
						</p>
						<p className="text-sm text-slate-400">
							{formatDateAgo(brand.created_at)}
						</p>
					</div>
				</div>
			</CardBody>
			<CardFooter className="flex">
				<Chip
					className="pl-3"
					startContent={<FaMap />}
					color="secondary"
					variant="flat"
				>
					Bootstrap Plan
				</Chip>
			</CardFooter>
		</Card>
	);
};

export default BrandCard;
