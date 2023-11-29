"use client";

import { Button, Chip, Image, Input, Textarea } from "@nextui-org/react";
import { FaArrowDown, FaPlus } from "react-icons/fa6";
import NextImage from "next/image";
import Link from "next/link";

interface LandingHeroProps {
	showImage?: boolean;
	showChip?: boolean;
	chipText?: string;
}

const LandingHero: React.FC<LandingHeroProps> = ({
	showImage = false,
	showChip = true,
	chipText = "Try it out now!",
}) => {
	return (
		<>
			<section>
				<div className="mx-auto max-w-screen-xl gap-12 px-4 py-28 md:px-8">
					<div className="mx-auto max-w-4xl space-y-5 text-center">
						{showChip && (
							<Chip
								variant="dot"
								color="success"
								size="lg"
								radius="sm"
							>
								{chipText}
							</Chip>
						)}
						<h2 className="mx-auto text-4xl font-bold md:text-6xl lg:text-8xl">
							Bootstrap your productivity with {""}
							<span className="bg-gradient-to-t from-success-300 to-success-500 bg-clip-text text-transparent">
								MarkAI
							</span>
						</h2>
						<p className="mx-auto max-w-2xl text-2xl">
							An open-source OpenAI wrapper for a RAG-based
							chatbot that seamlessly integrates with your
							documents.
						</p>
						<div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
							<Button
								color="success"
								size="md"
								startContent={<FaPlus />}
								as={Link}
								href="/sign-in"
							>
								Try it out
							</Button>
							<Button
								color="success"
								size="md"
								startContent={<FaArrowDown />}
								as={Link}
								href="/#features"
							>
								Check out features
							</Button>
						</div>
					</div>
					{showImage && (
						<div className="mt-14">
							<Image
								as={NextImage}
								src="/images/dashboard_image.webp"
								width={1920}
								height={1080}
								className="w-full rounded-lg border shadow-lg"
								alt="Dashboard Image"
								isBlurred={true}
								isZoomed={true}
							/>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default LandingHero;
