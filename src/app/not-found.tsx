import { Suspense } from "react";
import { Metadata } from "next";
import NotFoundPage from "@/components/error/400";
import { Loading } from "@/components/core/";

export const metadata: Metadata = {
	title: "Page Not Found - 404",
};

export default function NotFound() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<NotFoundPage />
			</Suspense>
		</>
	);
}
