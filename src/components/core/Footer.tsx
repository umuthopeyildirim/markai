"use client";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { SiOpenai, SiVercel } from "react-icons/si";

export default function Footer() {
	// TODO: Add footer navigation links this footer is not done yet
	const pathname = usePathname();
	const isVisible = pathname.match(/brands\/\d+\/chat/) ? false : true;
	const footerNavs = [
		{
			href: "/",
			name: "Home",
		},
		{
			href: "/about-us",
			name: "About us",
		},
		// {
		// 	href: "/legal/refund",
		// 	name: "Refund Policy",
		// },
		{
			href: "/legal/terms",
			name: "Terms",
		},
		{
			href: "/legal/privacy",
			name: "Privacy",
		},
		{
			href: "/legal/cookies",
			name: "Cookies",
		},
	];

	return (
		isVisible && (
			<footer>
				<div className="mx-auto max-w-screen-xl px-4 md:px-8">
					<div className="mt-2 items-center justify-between border-t border-gray-700 py-10 sm:flex">
						<p>
							© {new Date().getFullYear()} MarkAI - Created by{" "}
							<a
								href="https://umutyildirim.com"
								target="_blank"
								className="text-success"
								rel="noopener noreferrer"
							>
								Umut YILDIRIM
							</a>
							{" & "}
							<a
								href="https://burakyildirim.me"
								target="_blank"
								className="text-success"
								rel="noopener noreferrer"
							>
								Burak YILDIRIM
							</a>
						</p>
						<ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
							{footerNavs.map((item, key) => (
								<li key={key}>
									<Link href={item.href} color="success">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</footer>
		)
	);
}
