import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import TermsPage from "@/components/legal/terms";

export const metadata: Metadata = {
	title: "Terms and Conditions",
};

// This is not a real terms and conditions page, it is just a template
// You can use this page as a template for your terms and conditions page
export default function Terms() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<TermsPage />
			</Suspense>
		</>
	);
}
