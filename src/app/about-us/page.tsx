import AboutUsPage from "@/components/about-us";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loading } from "@/components/core";

export const metadata: Metadata = {
	title: "About Us",
};

export default function AboutUs() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<AboutUsPage />
			</Suspense>
		</>
	);
}
