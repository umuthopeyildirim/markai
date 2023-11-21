import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import PrivacyPolicy from "@/components/legal/privacy";

export const metadata: Metadata = {
	title: "Privacy Policy",
};

// This is not a real privacy policy page, it is just a template
// You can use this page as a template for your privacy policy page
export default function Privacy() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<PrivacyPolicy />
			</Suspense>
		</>
	);
}
