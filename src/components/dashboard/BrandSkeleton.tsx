"use client";

import { FC } from "react";
import { Card, Skeleton } from "@nextui-org/react";

const BrandSkeleton: FC = () => {
	return (
		<Card className="min-h-[440px] min-w-[350px] space-y-5 p-4">
			<Skeleton className="rounded-lg">
				<div className="h-64 rounded-lg bg-primary-300"></div>
			</Skeleton>
			<div className="space-y-3">
				<Skeleton className="w-3/5 rounded-lg">
					<div className="h-5 w-3/5 rounded-lg bg-primary-200"></div>
				</Skeleton>
				<Skeleton className="w-4/5 rounded-lg">
					<div className="h-5 w-4/5 rounded-lg bg-primary-200"></div>
				</Skeleton>
				<Skeleton className="w-2/5 rounded-lg">
					<div className="h-5 w-2/5 rounded-lg bg-primary-300"></div>
				</Skeleton>
			</div>
		</Card>
	);
};

export default BrandSkeleton;
