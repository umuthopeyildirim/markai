import AddBrandPage from "@/components/brands/add";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loading } from "@/components/core";

export const metadata: Metadata = {
	title: "Add a new brand",
};

const AddBrand = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<AddBrandPage />
			</Suspense>
		</>
	);
};

export default AddBrand;
