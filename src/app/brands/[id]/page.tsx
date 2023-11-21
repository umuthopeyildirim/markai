import { Metadata } from "next";
import { Suspense } from "react";
import { Loading } from "@/components/core";
import BrandPage from "@/components/brands/overview";

export const metadata: Metadata = {
	title: "Brand Name",
};

export default function Brand() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<BrandPage />
			</Suspense>
		</>
	);
}
