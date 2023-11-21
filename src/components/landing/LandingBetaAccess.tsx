"use client";

import { useState, useMemo } from "react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

function LandingBetaAccess() {
	const [value, setValue] = useState("");

	const validateEmail = (value: string) =>
		value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

	const isInvalid = useMemo(() => {
		if (value === "") return false;

		return validateEmail(value) ? false : true;
	}, [value]);

	return (
		<section id="apply">
			<div className="mx-auto max-w-screen-xl gap-12 px-4 py-28 md:px-8">
				<div className="grid items-center gap-6">
					<div className="flex flex-col justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="bg-gradient-to-r from-success to-success-500 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
								Revolutionize Your Brand
							</h1>
							<p className="mx-auto max-w-[600px] text-zinc-200 dark:text-zinc-100 md:text-xl">
								Join us and take control of your brand. Fast,
								secure, and designed for next-gen marketing.
							</p>
						</div>
						<div className="mx-auto w-full max-w-sm space-y-2">
							<form className="flex items-center space-x-2">
								<Input
									value={value}
									type="email"
									label="Email"
									variant="bordered"
									isInvalid={isInvalid}
									color={isInvalid ? "danger" : "success"}
									errorMessage={
										isInvalid &&
										"Please enter a valid email"
									}
									onValueChange={setValue}
									className="max-w-xs"
								/>
								<Button size="lg" color="success">
									Join Waitlist
								</Button>
							</form>
							<p className="text-xs text-zinc-200 dark:text-zinc-100">
								Get ready to redefine your brand experience.{" "}
								<Link
									className="text-success underline underline-offset-2"
									href="/legal/terms"
								>
									Terms & Conditions
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default LandingBetaAccess;
