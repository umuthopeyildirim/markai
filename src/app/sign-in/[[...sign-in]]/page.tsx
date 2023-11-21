import SignInPage from "@/components/auth/sign-in";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loading } from "@/components/core";

export const metadata: Metadata = {
	title: "Sign In",
};

export default function AboutUs() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<SignInPage />
			</Suspense>
		</>
	);
}
