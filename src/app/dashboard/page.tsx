import DashboardPage from "@/components/dashboard";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loading } from "@/components/core";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function Dashboard() {
	const { userId, orgId } = auth();
	return (
		<>
			<Suspense fallback={<Loading />}>
				<DashboardPage userId={userId} orgId={orgId} />
			</Suspense>
		</>
	);
}
