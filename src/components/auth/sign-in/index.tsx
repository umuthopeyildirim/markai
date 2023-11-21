"use client";

import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import {
	Card,
	CardHeader,
	Image,
	Button,
	Link,
	Spinner,
} from "@nextui-org/react";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<>
			{isLoading && (
				<div className="flex flex-1 flex-col items-center justify-center">
					<Spinner color="success" label="Loading..." />
				</div>
			)}
			{!isLoading && (
				<section className="flex h-full flex-1 flex-col">
					<main className="mx-auto my-8 grid max-w-screen-xl flex-1 grid-cols-1 gap-4 px-4 sm:px-8 lg:grid-cols-7 xl:grid-cols-3 xl:gap-8">
						<div className="flex items-center justify-center lg:col-span-3 xl:col-span-1">
							<ClerkLoading>
								<Spinner color="success" />
							</ClerkLoading>
							<ClerkLoaded>
								<SignIn />
							</ClerkLoaded>
						</div>
						<div className="relative hidden items-center justify-center lg:col-span-4 lg:flex xl:col-span-2">
							<Card
								isPressable={true}
								radius="lg"
								className="max-h-[50rem] w-auto border-none"
							>
								<CardHeader className="absolute top-1 z-10 flex-col !items-end">
									<Button
										as={Link}
										href="https://unsplash.com/@lilrohit"
										target="_blank"
										className="justify-center bg-white text-black"
										radius="full"
										endContent={<BsArrowUpRight />}
									>
										Photo by Rohit Choudhari on Unsplash
									</Button>
								</CardHeader>
								<Image
									as={NextImage}
									alt="3D Rendering of glass dispersion"
									className="z-9 object-cover"
									src="/images/glass_dispersion.webp"
									width={500}
									height={750}
								/>
							</Card>
							<div
								className="absolute inset-0 my-auto h-[500px]"
								style={{
									background:
										"linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
									filter: "blur(118px)",
								}}
							/>
						</div>
					</main>
				</section>
			)}
		</>
	);
}
