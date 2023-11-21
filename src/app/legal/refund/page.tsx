import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import RefundPage from "@/components/legal/refund";

export const metadata: Metadata = {
	title: "Refund Policy",
};

// This is not a real refund policy page, it is just a template
// You can use this page as a template for your refund policy page
export default function Refund() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<RefundPage />
			</Suspense>
		</>
	);
}
