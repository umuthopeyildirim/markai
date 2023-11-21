"use client";

import { Button, Link } from "@nextui-org/react";

// Depreceted feature not in use for this demo however you can use it if you want
export default function Page() {
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
			<section className="mx-auto mt-12 max-w-screen-xl px-4 md:p-8">
				<div className="">
					<div className="flex flex-col items-center gap-2">
						<h1 className="text-4xl font-light">Buy Credits</h1>
						<p className="w-2/3">
							Every new image you create in our web application
							deducts one credit from your account balance. You
							can also produce variations of existing images, but
							please note, this operation also costs one credit
							per image variant created.
						</p>
					</div>
				</div>
				<div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
					{plans.map((item, idx) => (
						<div
							key={idx}
							className={`relative mt-6 flex flex-1 flex-col items-stretch rounded-xl border-2 sm:mt-0 ${
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
							<div className="space-y-4 border-b p-8">
								<span className="font-medium text-success">
									{item.name}
								</span>
								<div className="text-3xl font-semibold text-default-800">
									${item.price}{" "}
									<span className="text-xl font-normal text-gray-600">
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
			</section>
		</>
	);
}
