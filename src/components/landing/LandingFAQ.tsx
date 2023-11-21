"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";

function LandingFAQ() {
	return (
		<>
			<section id="faqs">
				<div className="mx-auto max-w-screen-xl gap-12 px-4 md:px-8">
					<div className="mx-auto max-w-4xl space-y-5 text-center">
						<h2 className="mx-auto text-4xl md:text-6xl">
							<span className="bg-gradient-to-t from-success-300 to-success-500 bg-clip-text text-transparent">
								If you have any queries or concerns,
							</span>{" "}
							<span className="underline decoration-success">
								rest assured
							</span>
						</h2>
						<p className="mx-auto max-w-2xl text-xl">
							we&apos;ve compiled answers to the most common
							questions right here.
						</p>
					</div>
					<div className="mx-auto max-w-screen-xl gap-12 px-4 py-28 md:px-8">
						<Accordion variant="light">
							<AccordionItem
								key="1"
								aria-label="What is MarkAI and how can it help in brand building?"
								title="What is MarkAI and how can it help in brand building?"
								indicator={
									<FaArrowLeft
										size={20}
										className="text-success"
									/>
								}
							>
								MarkAI is an AI-platform that guides users on
								their journey to build an amazing brand,
								offering tailored solutions and innovative
								methods to revolutionize traditional
								brand-building.
							</AccordionItem>
							<AccordionItem
								key="2"
								aria-label="How does the AI-driven capability of  differ from traditional brand-building methods?"
								title="How does the AI-driven capability of  differ from traditional brand-building methods?"
								indicator={
									<FaArrowLeft
										size={20}
										className="text-success"
									/>
								}
							>
								Unlike conventional methods, &apos;s AI-driven
								capabilities provide personalized and optimized
								strategies for brand-building, ensuring that
								your brand remains relevant and competitive in
								today&apos;s dynamic market.
							</AccordionItem>
							<AccordionItem
								key="3"
								aria-label="Do you offer specialized support for larger organizations?"
								title="Do you offer specialized support for larger organizations?"
								indicator={
									<FaArrowLeft
										size={20}
										className="text-success"
									/>
								}
							>
								Yes, we offer Enterprise Support which is
								designed specifically for the needs of large
								organizations. It includes dedicated and
								personalized assistance, ensuring smooth
								operations and immediate troubleshooting.
							</AccordionItem>
							<AccordionItem
								key="4"
								aria-label="How does  ensure the success and growth of my brand?"
								title="How does  ensure the success and growth of my brand?"
								indicator={
									<FaArrowLeft
										size={20}
										className="text-success"
									/>
								}
							>
								combines innovative AI-driven strategies with
								expert support. Our platform not only guides you
								in crafting your brand but also offers
								Enterprise Support to handle any challenges,
								ensuring sustained growth and success.
							</AccordionItem>
							<AccordionItem
								key="5"
								aria-label="Does  offer a free trial or a demo version?"
								title="Does  offer a free trial or a demo version?"
								indicator={
									<FaArrowLeft
										size={20}
										className="text-success"
									/>
								}
							>
								Yes, we offer currently offer 20 free credits if
								you signup to our platform. This will allow you
								to test out our platform and see if it is right
								for you.
							</AccordionItem>
							<AccordionItem
								key="6"
								aria-label="Are there any discounts available for startups or non-profits looking to use ?"
								title="Are there any discounts available for startups or non-profits looking to use ?"
								indicator={
									<FaArrowLeft
										size={20}
										className="text-success"
									/>
								}
							>
								Yes, we offer extra 100 credits and 50% discount
								for startups and non-profits. Please contact us
								at
								<a href="mailto:student@markai.co">
									student@markai.co
								</a>{" "}
								with your student or non-profit email address to
								get started. Please provide tax exemption
								certificate for non-profits.
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>
		</>
	);
}

export default LandingFAQ;
