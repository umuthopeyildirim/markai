import SignUpPage from "@/components/auth/sign-up";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loading } from "@/components/core";

export const metadata: Metadata = {
	title: "Sign Up",
};

export default function AboutUs() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<SignUpPage />
			</Suspense>
		</>
	);
}
