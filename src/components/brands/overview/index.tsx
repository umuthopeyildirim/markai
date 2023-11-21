"use client";

import {
	Card,
	CardBody,
	CardHeader,
	Accordion,
	AccordionItem,
} from "@nextui-org/react";

function BrandPage() {
	const defaultContent =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

	// TODO: Onboarding and Prompt Adviser
	return (
		<>
			<div className="flex flex-1 flex-col gap-8 p-12 md:flex-row">
				<Card className="flex-1 border border-default-200 bg-default-50 bg-opacity-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<p className="text-xl">Onboarding</p>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							<Accordion>
								<AccordionItem
									startContent="1"
									key="1"
									aria-label="Make sure your data is ready"
									title="Make sure your data is ready"
								>
									Make sure your data is correctly formatted
									with correct file types. Currently we only
									support TXT, MD and HTML. We are working on
									adding more file types.
								</AccordionItem>
								<AccordionItem
									startContent="2"
									key="2"
									aria-label="Add data to knowledge base"
									title="Add data to knowledge base"
								>
									After you have made sure your data is ready
									you can add it to the knowledge base. Based
									on your Supabase instance type it might take
									a while to process your data. There is a
									great documentation about this on{" "}
									<a
										className="text-success underline"
										href="https://supabase.com/docs/guides/ai/choosing-compute-addon"
										target="_blank"
									>
										Supabase Docs
									</a>
									.
								</AccordionItem>
								<AccordionItem
									startContent="3"
									key="3"
									aria-label="Start asking questions"
									title="Start asking questions"
								>
									After your data is processed you can start
									asking questions. You can also use our
									prompt adviser to get some suggestions.
								</AccordionItem>
							</Accordion>
						</div>
					</CardBody>
				</Card>

				<Card className="flex-1 border border-default-200 bg-default-50 bg-opacity-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<p className="text-xl">Some Prompt Suggestions</p>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							<Accordion>
								<AccordionItem
									key="1"
									aria-label="ChatGPT SEO prompts"
									title="ChatGPT SEO prompts"
								>
									Using WebPilot, create an outline for an
									article that will be 2,000 words on the
									keyword “Best SEO Prompts” based on the top
									10 results from Google. Include every
									relevant heading possible. Keep the keyword
									density of the headings high. For each
									section of the outline, include the word
									count. Include FAQs section in the outline
									too, based on people also ask section from
									Google for the keyword. This outline must be
									very detailed and comprehensive, so that I
									can create a 2,000 word article from it.
									Generate a long list of LSI and NLP keywords
									related to my keyword. Also include any
									other words related to the keyword. Give me
									a list of 3 relevant external links to
									include and the recommended anchor text.
									Make sure they’re not competing articles.
									Split the outline into part 1 and part 2.
								</AccordionItem>
								<AccordionItem
									key="2"
									aria-label="Act as an Advertiser"
									title="Act as an Advertiser"
								>
									I want you to act as an advertiser. You will
									create a campaign to promote a product or
									service of your choice. You will choose a
									target audience, develop key messages and
									slogans, select the media channels for
									promotion, and decide on any additional
									activities needed to reach your goals. My
									first suggestion request is “I need help
									creating an advertising campaign for a new
									type of energy drink targeting young adults
									aged 18-30.”
								</AccordionItem>
								<AccordionItem
									key="3"
									aria-label="Act as a Recruiter"
									title="Act as a Recruiter"
								>
									I want you to act as a recruiter. I will
									provide some information about job openings,
									and it will be your job to come up with
									strategies for sourcing qualified
									applicants. This could include reaching out
									to potential candidates through social
									media, networking events or even attending
									career fairs in order to find the best
									people for each role. My first request is “I
									need help improve my CV.”
								</AccordionItem>
							</Accordion>
						</div>
					</CardBody>
				</Card>
			</div>
		</>
	);
}

export default BrandPage;
