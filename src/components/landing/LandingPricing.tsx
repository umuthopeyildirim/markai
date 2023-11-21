"use client";

import { Button } from "@nextui-org/react";
import { FaShieldHalved } from "react-icons/fa6";
import Link from "next/link";

// Deprecated feature not in use anymore however you can still use this component if you want to
function LandingPricing() {
	const plans = [
		{
			name: "50 Credits",
			desc: "$0.20 per credit",
			price: 10,
			isMostPop: false,
			isMostAffordable: false,
			href: "https://markflare.lemonsqueezy.com/checkout/buy/84e4a414-b836-4496-8531-ef449190af76",
		},
		{
			name: "100 Credits",
			desc: "$0.18 per credit",
			price: 18,
			isMostPop: true,
			isMostAffordable: false,
			href: "https://markflare.lemonsqueezy.com/checkout/buy/e9052057-cf59-420a-a9a8-0956fed78df9",
		},
		{
			name: "250 Credits",
			desc: "$0.16 per credit",
			price: 35,
			isMostPop: false,
			isMostAffordable: true,
			href: "https://markflare.lemonsqueezy.com/checkout/buy/b046c552-6f7f-4d94-b094-7e02a17c0ed3",
		},
	];
	return (
		<>
			<section id="pricing">
				<div className="mx-auto max-w-screen-xl gap-12 px-4 py-28 md:px-8">
					<div className="mx-auto max-w-4xl space-y-5 text-center">
						<h2 className="mx-auto text-4xl md:text-6xl ">
							<span className="bg-gradient-to-t from-success-300 to-success-500 bg-clip-text text-transparent">
								Pay as you go...
							</span>{" "}
							No{" "}
							<span className="text-danger line-through">
								contract
							</span>{" "}
							no{" "}
							<span className="text-danger line-through">
								commitment
							</span>
						</h2>
						<p className="mx-auto max-w-2xl text-xl">
							Use your credits to generate{" "}
							<span className="font-bold">logos</span>,{" "}
							<span className="font-bold">icons</span>, and{" "}
							<span className="font-bold">brand names</span>. You
							can buy more credits at any time.
						</p>
					</div>
					<div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
						{plans.map((item, idx) => (
							<div
								key={idx}
								className={`relative mt-6 flex flex-1 flex-col items-stretch rounded-xl border border-content2 bg-content1 sm:mt-0 ${
									item.isMostPop ? "mt-10" : ""
								}`}
							>
								{item.isMostPop ? (
									<span className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full border bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 shadow-md">
										Most popular
									</span>
								) : (
									""
								)}
								{item.isMostAffordable ? (
									<span className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full border bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 shadow-md">
										Best Offer
									</span>
								) : (
									""
								)}
								<div className="space-y-4 p-8">
									<span className="font-medium text-success">
										{item.name}
									</span>
									<div className="text-3xl font-semibold text-default-800">
										${item.price}{" "}
										<span className="text-xl font-normal text-gray-400">
											/ Per
										</span>
									</div>
									<p>{item.desc}</p>
									<Button
										as={Link}
										href={item.href}
										target="_blank"
										className="w-full rounded-lg bg-success px-3 py-3 text-sm font-semibold text-white duration-150 hover:bg-success-500 active:bg-success-700"
									>
										Get Started
									</Button>
								</div>
							</div>
						))}
					</div>
					<div className="mt-16 flex flex-col items-center justify-center gap-4">
						<FaShieldHalved
							size={25}
							className="justify-center text-success"
						/>
						<p className="text-center text-foreground-500">
							All payments are secured by{" "}
							<span className="font-bold text-foreground-600">
								256-bit TLS Encryption
							</span>
							.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}

export default LandingPricing;
