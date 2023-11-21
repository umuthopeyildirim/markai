"use client";

import { useState } from "react";
import {
	Button,
	Link,
	Textarea,
	Tooltip,
	Avatar,
	Divider,
	Kbd,
} from "@nextui-org/react";
import {
	FaTrashCan,
	FaArrowRight,
	FaShare,
	FaArrowsRotate,
} from "react-icons/fa6";
import { FaRegCommentAlt, FaUser } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { useChat } from "ai/react";

interface BrandChatPageProps {
	brand_id: string;
}

function BrandChatPage({ brand_id }: BrandChatPageProps) {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: "/api/chat/agent",
		body: {
			brand_id: brand_id,
		},
	});

	return (
		<>
			<main className="flex flex-1 flex-col">
				<div className="relative flex h-[calc(100vh_-_146px)] flex-row overflow-hidden">
					{/* Chat */}
					<div className="animate-in group flex w-full flex-col justify-between overflow-auto bg-content1 pl-0 duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
						<div className="pb-[200px] pt-4 md:pt-10">
							<div className="relative mx-auto max-w-2xl px-4">
								{/* Chat */}
								<div>
									{messages.map((message) => (
										<div
											key={message.id}
											className="group relative mb-4 flex items-start md:-ml-12"
										>
											{message.role === "assistant" ? (
												<Avatar
													className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-foreground text-success shadow"
													icon={
														<SiOpenai size={20} />
													}
												/>
											) : (
												<Avatar
													className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-foreground text-success shadow"
													icon={<FaUser size={20} />}
												/>
											)}
											<div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
												<div className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words">
													{message.content}
													<Divider className="mt-5" />
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="h-px w-full"></div>
						</div>
						<div className="from-muted/30 to-muted/30 animate-in w-full bg-gradient-to-b from-0% to-50% duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80">
							<div className="mx-auto sm:max-w-2xl sm:px-4">
								<div className="relative mt-2 !border-b-0 border-t border-content2 bg-background px-4 py-2 shadow-lg max-sm:flex max-sm:gap-2 sm:rounded-t-xl sm:border md:py-4">
									<form onSubmit={handleSubmit}>
										<Textarea
											minRows={1}
											color="success"
											classNames={{
												input: "py-3.5",
												label: "hidden",
											}}
											variant="bordered"
											placeholder="Send a message"
											value={input}
											onChange={handleInputChange}
										/>
										<div className="absolute right-[4.5rem] top-2 z-10 flex h-[52px] flex-col items-center justify-center sm:right-8 md:top-4">
											<Button
												isIconOnly
												className="bg-success-400"
												size="sm"
												type="submit"
											>
												<Kbd
													keys={["enter"]}
													className="bg-transparent text-success-200 shadow-none"
												/>
											</Button>
										</div>
										<div className="mb-1.5 mt-0.5 flex flex-col items-center justify-center">
											<Button
												aria-label="Regenerate Response"
												size="sm"
												className="bg-transparent text-base text-success sm:hidden"
												isIconOnly
												disableRipple
											>
												<FaArrowsRotate />
											</Button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default BrandChatPage;
