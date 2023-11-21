"use client";

import { useState } from "react";
import {
	Button,
	Link,
	Textarea,
	Tooltip,
	Avatar,
	Divider,
} from "@nextui-org/react";
import {
	FaTrashCan,
	FaArrowRight,
	FaShare,
	FaArrowsRotate,
} from "react-icons/fa6";
import { FaRegCommentAlt, FaUser } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

export default function BrandChatPage() {
	const [query, setQuery] = useState("");
	const [messages, setMessages] = useState([
		{
			id: 1,
			ai: false,
			messages: [
				{
					id: 1,
					content:
						"Send an email to [Friend's Name] about the following insurance:",
				},
			],
		},
		{
			id: 2,
			ai: true,
			messages: [
				{
					id: 1,
					content: "Hey [Friend's Name],",
				},
				{
					id: 2,
					content:
						"I hope this email finds you well. I wanted to talk to you about something important - car crash insurance. I know it's not the most exciting topic, but it's crucial to ensure you're protected in case of an accident.",
				},
			],
		},
	]);
	return (
		<>
			<main className="flex flex-1 flex-col">
				<div className="relative flex h-[calc(100vh_-_146px)] flex-row overflow-hidden">
					{/* Sidebar -translate-x-full */}
					<div className="peer hidden h-full flex-col bg-content2 duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
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
						<div className="flex items-center justify-between p-4"></div>
					</div>
					{/* Sidebar Controller */}
					{/* Chat */}
					<div className="animate-in group flex w-full flex-col justify-between overflow-auto bg-content1 pl-0 duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
						<div className="pb-[200px] pt-4 md:pt-10">
							<div className="relative mx-auto max-w-2xl px-4">
								{/* Chat */}
								<div>
									{messages.map((message, key) => (
										<div
											key={key}
											className="group relative mb-4 flex items-start md:-ml-12"
										>
											{message.ai ? (
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
													{message.messages.map(
														(message, key) => (
															<p
																key={key}
																className="mb-2 last:mb-0"
															>
																{
																	message.content
																}
															</p>
														)
													)}
													<Divider className="mt-5" />
												</div>
											</div>
										</div>
									))}
								</div>
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
						<div className="from-muted/30 to-muted/30 animate-in w-full bg-gradient-to-b from-0% to-50% duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
							<div className="mx-auto sm:max-w-2xl sm:px-4">
								<div className="flex h-12 items-center justify-center">
									<div className="flex space-x-2">
										<Button
											color="success"
											variant="faded"
											aria-label="Regenerate Response"
										>
											<FaArrowsRotate />
											Regenarate Response
										</Button>
										<Button
											color="success"
											variant="faded"
											aria-label="Share this chat"
										>
											<FaShare />
											Share this chat
										</Button>
									</div>
								</div>
								<div className="mt-2 space-y-4 border-t border-content2 bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
									<Textarea
										variant="bordered"
										placeholder="Enter your description"
										className="col-span-12 mb-6 md:col-span-6 md:mb-0"
										value={query}
										onChange={(e) =>
											setQuery(e.target.value)
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
