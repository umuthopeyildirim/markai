"use client";

import NextImage from "next/image";
import { Button } from "@nextui-org/react";
import { FaHouse } from "react-icons/fa6";
import Link from "next/link";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<html lang="en" className="dark">
			<body className="flex min-h-screen flex-col items-center justify-center">
				<div className="mx-auto flex max-w-screen-md flex-1 flex-col items-center justify-center gap-4 px-4 md:px-8">
					<div className="max-w-xs">
						<NextImage
							alt="Global Error Image"
							src="/global-error.svg"
							sizes="100vw"
							style={{
								width: "100%",
								height: "auto",
							}}
							width={524.67001}
							height={418.27099}
						/>
					</div>
					<div className="flex flex-col items-center font-bold">
						<span className="bg-gradient-to-t from-success-300 to-success-500 bg-clip-text text-6xl text-transparent">
							Oops!
						</span>
						<p className="text-center text-4xl">
							Something went wrong.
						</p>
						<Link href="/" className="mt-4">
							<Button startContent={<FaHouse />} color="success">
								Go Home
							</Button>
						</Link>
					</div>
				</div>
			</body>
		</html>
	);
}
