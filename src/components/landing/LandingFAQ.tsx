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
								aria-label="What is MarkAI and how can it help me?"
								title="What is MarkAI and how can it help me?"
								indicator={
									<FaArrowLeft
										size={20}
										className="text-success"
									/>
								}
							>
								MarkAI is open source OpenAI wrapper that allows
								you to leverage the power of OpenAI with
								Langchain. MarkAI is a platform that provides
								document and content searching that increases
								your productivity and efficiency.
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
								Unlike conventional methods, MarkAI&apos;s
								AI-driven capabilities provide personalized and
								optimized strategies for you and your brand.
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
								No, MarkAI is open source and free to use.
								However if you need help with setup or have any
								questions, feel free to reach out to us on our
								Github repo.
							</AccordionItem>
							<AccordionItem
								key="4"
								aria-label="How does MarkAI ensure the success and security?"
								title="How does MarkAI ensure the success and security?"
								indicator={
									<FaArrowLeft
										size={20}
										className="text-success"
									/>
								}
							>
								MarkAI is open source and free to use. We
								don&apos;t store any of your data. All your data
								is stored in your Supabase database. All
								controled by you. Users don&apos;t have access
								to other users data.
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>
		</>
	);
}

export default LandingFAQ;
