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
import { AiOutlineEnter } from "react-icons/ai";

// IMPORTANT NOTE: This is the same as src/app/brands/%5Bid%5D/chat/%chatID%5D/page.tsx except for the following:
// - This page is the landing page for the AI chatbot not for chat
// - When chat is started it needs to be assigned chatID and then redirected to the chat page with the chatID
export default function BrandChatPage() {
	const [query, setQuery] = useState("");
	const [messages, setMessages] = useState([]);
	return (
		<>
			<main className="flex flex-1 flex-col">
				<div className="relative flex h-[calc(100vh_-_129px)] flex-row overflow-hidden">
					{/* Sidebar -translate-x-full */}
					<div className="hidden h-full flex-col bg-content2 duration-300 ease-in-out md:flex md:w-[200px] lg:w-[250px]  xl:w-[300px]">
						<div className="p-4">
							<p className="text-muted text-sm font-semibold">
								Chat History
							</p>
						</div>
						<div className="flex-1 overflow-auto">
							<div className="h-full flex-1 overflow-auto">
								<div className="space-y-2 px-2">
									<div>
										<div className="relative h-12">
											<div className="absolute left-2 top-1 flex h-6 w-6 items-center justify-center">
												<FaRegCommentAlt />
											</div>
											<Link
												className="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground bg-accent group inline-flex h-8 w-full items-center justify-center rounded-md px-8 py-2 pr-16 text-sm font-semibold shadow-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
												color="foreground"
												// TODO: add chat ID
												href="#"
											>
												<p className="relative max-h-5 flex-1 select-none overflow-hidden truncate break-all">
													Chat 1
												</p>
											</Link>
											<div className="absolute right-2 top-0">
												<div className="space-x-1">
													{/* TODO: Add copy func */}
													<Tooltip content="Share">
														<Button
															isIconOnly
															size="sm"
															color="success"
															variant="light"
															aria-label="Share this chat"
														>
															<FaShare />
														</Button>
													</Tooltip>
													{/* TODO: Add modal */}
													<Tooltip content="Delete">
														<Button
															isIconOnly
															size="sm"
															color="success"
															variant="light"
															aria-label="Delete this chat"
														>
															<FaTrashCan />
														</Button>
													</Tooltip>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* TODO: Remaining Usage and Delete all chat Button */}
						{/* <div className="flex items-center justify-between p-4"></div> */}
					</div>
					{/* Sidebar Controller */}
					{/* Chat */}
					<div className="animate-in group flex flex-1 flex-col justify-between overflow-auto bg-content1 pl-0 duration-300 ease-in-out">
						<div className="pt-4 md:pt-10">
							<div className="relative mx-auto max-w-2xl px-4">
								{/* Empty Chat */}
								{messages.length === 0 && (
									<div className="rounded-lg border border-content2 bg-background p-8">
										<h1 className="mb-2 text-lg font-semibold">
											Welcome to MarkAI AI Chatbot!
										</h1>
										<p className="text-muted-foreground mb-2 leading-normal">
											Introducing an AI chatbot tailored
											for your brand. It leverages the
											insights you offer to address
											brand-specific queries. Beyond that,
											it can craft emails, generate
											invoices, and design creative
											advertisements, among other tasks.
										</p>
										<p className="text-muted-foreground leading-normal">
											You can start a conversation here or
											try the following examples:
										</p>
										<div className="mt-4 flex flex-col items-start space-y-2">
											<Button
												color="success"
												variant="light"
												startContent={<FaArrowRight />}
												onClick={() => {
													setQuery(
														"Draft an email to our costumer about the following: \n"
													);
												}}
											>
												Create an email for customer
											</Button>
											<Button
												color="success"
												variant="light"
												startContent={<FaArrowRight />}
												onClick={() => {
													setQuery(
														"Draft an email to our costumer about the following: \n"
													);
												}}
											>
												Create an email for customer
											</Button>
											<Button
												color="success"
												variant="light"
												startContent={<FaArrowRight />}
												onClick={() => {
													setQuery(
														"Draft an email to our costumer about the following: \n"
													);
												}}
											>
												Create an email for customer
											</Button>
										</div>
									</div>
								)}
							</div>
							<div className="h-px w-full"></div>
						</div>
						<div className="from-muted/30 to-muted/30 animate-in w-full bg-gradient-to-b from-0% to-50% duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80">
							<div className="mx-auto sm:max-w-2xl sm:px-4">
								<div className="flex flex-col items-center justify-center gap-2 max-sm:mt-2 sm:flex-row">
									<Button
										color="success"
										variant="faded"
										aria-label="Regenerate Response"
										size="sm"
										className="max-sm:hidden"
									>
										<FaArrowsRotate />
										Regenarate Response
									</Button>
									<Button
										color="success"
										variant="faded"
										aria-label="Share this chat"
										size="sm"
									>
										<FaShare />
										Share this chat
									</Button>
								</div>
								<div className="relative mt-2 !border-b-0 border-t border-content2 bg-background px-4 py-2 shadow-lg max-sm:flex max-sm:gap-2 sm:rounded-t-xl sm:border md:py-4">
									<Textarea
										minRows={1}
										color="success"
										classNames={{
											input: "py-3.5",
											label: "hidden",
										}}
										variant="bordered"
										placeholder="Send a message"
										value={query}
										onChange={(e) =>
											setQuery(e.target.value)
										}
									/>
									<div className="absolute right-[4.5rem] top-2 z-10 flex h-[52px] flex-col items-center justify-center sm:right-8 md:top-4">
										<Button
											isIconOnly
											className="bg-success-400"
											size="sm"
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
