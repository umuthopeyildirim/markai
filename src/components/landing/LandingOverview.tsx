"use client";

import { Image, Card, CardHeader, CardBody } from "@nextui-org/react";
import NextImage from "next/image";

function LandingOverview() {
	return (
		<>
			<section id="overview">
				<div className="mx-auto max-w-screen-xl gap-12 px-4 py-28 md:px-8">
					<div className="mx-auto max-w-4xl space-y-5 text-center">
						<h2 className="mx-auto text-4xl md:text-6xl ">
							Shorten your project times{" "}
							<span className="bg-gradient-to-t from-success-300 to-success-500 bg-clip-text text-transparent">
								massively
							</span>
							, starting{" "}
							<span className="italic underline">today</span>
						</h2>
						<p className="mx-auto max-w-2xl text-xl">
							Whether you&apos;re launching a small startup or
							building a grand enterprise, guides you on your
							journey to establish an amazing brand…
							<span className="text-bold bg-gradient-to-t from-success-300 to-success-500 bg-clip-text text-transparent">
								{" "}
								efficiently
							</span>
							.
						</p>
					</div>
					<div className="grid-col-1 mt-10 grid gap-4 px-8 text-center md:grid-cols-3">
						<Card className="p-8 ">
							<CardHeader className="mb-10 flex-col items-center px-4 pb-0 pt-2">
								<h4 className="text-large text-default-800">
									AI-Generated brand names with diverse LLMs
								</h4>
							</CardHeader>
							<CardBody className="overflow-visible py-2">
								<Image
									as={NextImage}
									alt="Card background"
									className="rounded-xl object-cover"
									src="/images/hero-card-complete.webp"
									height={270}
									width={270}
								/>
							</CardBody>
						</Card>
						<Card className="p-8">
							<CardHeader className="mb-10 flex-col items-center px-4 pb-0 pt-2">
								<h4 className="text-large">
									Vector Search to diversify your brand name
								</h4>
							</CardHeader>
							<CardBody className="overflow-visible py-2">
								<Image
									as={NextImage}
									alt="Card background"
									className="rounded-xl object-cover"
									src="/images/hero-card-complete.webp"
									height={270}
									width={270}
								/>
							</CardBody>
						</Card>
						<Card className="p-8">
							<CardHeader className="mb-10 flex-col items-center px-4 pb-0 pt-2">
								<h4 className="text-large">
									Unlimited icon and logo possibilities
								</h4>
							</CardHeader>
							<CardBody className="overflow-visible py-2">
								<Image
									as={NextImage}
									alt="Card background"
									className="rounded-xl object-cover"
									src="/images/hero-card-complete.webp"
									height={270}
									width={270}
								/>
							</CardBody>
						</Card>
						<Card className="p-8">
							<CardHeader className="mb-10 flex-col items-center px-4 pb-0 pt-2">
								<h4 className="text-large">
									High resolution logos and icons
								</h4>
							</CardHeader>
							<CardBody className="overflow-visible py-2">
								<Image
									as={NextImage}
									alt="Card background"
									className="rounded-xl object-cover"
									src="/images/hero-card-complete.webp"
									height={270}
									width={270}
								/>
							</CardBody>
						</Card>
						<Card className="p-8">
							<CardHeader className="mb-10 flex-col items-center px-4 pb-0 pt-2">
								<h4 className="text-large">
									Always accesable and easy to download
								</h4>
							</CardHeader>
							<CardBody className="overflow-visible py-2">
								<Image
									as={NextImage}
									alt="Card background"
									className="rounded-xl object-cover"
									src="/images/hero-card-complete.webp"
									height={270}
									width={270}
								/>
							</CardBody>
						</Card>
						<Card className="p-8">
							<CardHeader className="mb-10 flex-col items-center px-4 pb-0 pt-2">
								<h4 className="text-large">
									Comes with all the tools you need
								</h4>
							</CardHeader>
							<CardBody className="overflow-visible py-2">
								<Image
									as={NextImage}
									alt="Card background"
									className="rounded-xl object-cover"
									src="/images/hero-card-complete.webp"
									height={270}
									width={270}
								/>
							</CardBody>
						</Card>
					</div>
				</div>
			</section>
		</>
	);
}

export { LandingOverview };
