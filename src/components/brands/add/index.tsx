"use client";

import { useEffect, useState } from "react";
import {
	Textarea,
	Button,
	Link,
	RadioGroup,
	Radio,
	Select,
	Selection,
	SelectItem,
	Input,
} from "@nextui-org/react";
import { brandIndustries } from "@/data/industries";
import { Steps } from "@/components";
import { useUser, useOrganization, useAuth } from "@clerk/nextjs";
import { supabaseClient } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";

export default function AddBrandPage() {
	// TODO: Add brand name, description, industry, website URL, employees, keywords, social media links
	// TODO: Maybe add the func of LOGO adding and location
	const router = useRouter();
	const { getToken } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const { isSignedIn, user, isLoaded } = useUser();
	const { organization } = useOrganization();

	const stepsItems = ["Overview", "Details", "Finalize"];
	const [brandSlug, setBrandSlug] = useState<string>("");
	const [brandSlugConfirmed, setBrandSlugConfirmed] =
		useState<boolean>(false);
	const [brandSlugError, setBrandSlugError] = useState<string[]>([]);
	const [brandName, setBrandName] = useState<string>("");
	const [brandNameError, setBrandNameError] = useState<string[]>([]);
	const [brandDescription, setBrandDescription] = useState<string>("");
	const [brandDescriptionError, setBrandDescriptionError] = useState<
		string[]
	>([]);
	const [brandWebsiteUrl, setBrandWebsiteUrl] = useState<string>("");
	const [brandIndustry, setBrandIndustry] = useState<Selection>(new Set([]));
	const [brandIndustriesError, setBrandIndustriesError] = useState<string[]>(
		[]
	);
	const [brandEmployees, setBrandEmployees] = useState<string>("");
	const [brandEmployeesError, setBrandEmployeesError] = useState<string[]>(
		[]
	);
	const [brandKeywords, setBrandKeywords] = useState<string>("");
	const [brandKeywordsError, setBrandKeywordsError] = useState<string[]>([]);
	const [brandSocialMediaLinks, setBrandSocialMediaLinks] = useState<
		Record<string, string>
	>({
		linkedin: "",
		instagram: "",
		facebook: "",
		tiktok: "",
		twitter: "",
	});
	const [submitNewBrand, setSubmitNewBrand] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);

	useEffect(() => {
		if (brandSlug.length > 3) {
			handleCheckBrandSlug();
		}
	}, [brandSlug]);

	const handleCheckBrandSlug = async () => {
		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);

		const { data, error } = await supabase
			.from("brands")
			.select()
			.eq("slug", brandSlug);
		if (error) {
			console.log(error);
		}
		if (data) {
			if (data.length > 0) {
				setBrandSlugError(["This slug is taken"]);
			} else {
				setBrandSlugConfirmed(true);
			}
		}
	};

	const handleBrandIndustrySelectionChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setBrandIndustry(new Set([e.target.value]));
		setBrandIndustriesError([]);
	};

	const handleBrandEmployeesSelectionChange = (value: string) => {
		setBrandEmployeesError([]);
		setBrandEmployees(value);
	};

	const handleBrandDescriptionChange = (value: string) => {
		setBrandDescriptionError([]);
		setBrandDescription(value);
	};

	const handleBrandNameChange = (value: string) => {
		setBrandNameError([]);
		setBrandName(value);
	};

	const handleBrandKeywordsChange = (value: string) => {
		setBrandKeywordsError([]);
		setBrandKeywords(value);
	};

	const validateStepOne = () => {
		let isValid = true;
		if (brandSlug.length < 3) {
			setBrandSlugError([
				"Please provide a slug of 3 characters or more",
			]);
			isValid = false;
		}
		if (brandName.length < 3) {
			setBrandNameError([
				"Please provide a name of 3 characters or more",
			]);
			isValid = false;
		}
		if (brandDescription.length < 30) {
			setBrandDescriptionError([
				"Please provide a description of 30 characters or more",
			]);
			isValid = false;
		}
		if ((brandIndustry as Set<string>).size === 0) {
			setBrandIndustriesError(["Please select an industry"]);
			isValid = false;
		}
		return isValid;
	};

	const validateStepTwo = () => {
		let isValid = true;
		if (brandEmployees.length === 0) {
			setBrandEmployeesError(["Please select an employee size"]);
			isValid = false;
		}
		if (brandKeywords.length === 0) {
			setBrandKeywordsError(["Please provide at least one keyword"]);
			isValid = false;
		}
		return isValid;
	};

	const handleBrandSubmit = async () => {
		setSubmitNewBrand(true);
		// Find brand industry label from brandIndustries data
		const industry = brandIndustries.find(
			(industry) => industry.value === Array.from(brandIndustry)[0]
		);
		// Convert industry to JSON
		const industryJson = industry;

		const supabaseAccessToken = await getToken({
			template: "supabase",
		});

		const supabase = await supabaseClient(supabaseAccessToken as string);

		const { error } = await supabase.from("brands").insert([
			{
				slug: brandSlug,
				name: brandName,
				description: brandDescription,
				domain: brandWebsiteUrl,
				industry: industryJson,
				size: brandEmployees,
				keywords: brandKeywords,
				social_media: brandSocialMediaLinks,
				user_id: user?.id,
				org_id: organization?.id,
			},
		]);
		if (error) {
			console.log(error);
			setSubmitNewBrand(false);
		} else {
			// Redirect to dashboard if insertion is successful
			router.push("/dashboard");
		}
	};

	const handleProgressions = () => {
		switch (step) {
			case 1:
				if (validateStepOne()) setStep(2);
				break;
			case 2:
				if (validateStepTwo()) setStep(3);
				break;
			case 3:
				// Submit brand to the server
				handleBrandSubmit();
				break;
			default:
				console.error("Invalid step");
		}
	};

	const checkSlugAvailability = debounce(async () => {
		setIsLoading(true);

		const supabaseAccessToken = await getToken({ template: "supabase" });
		const supabase = await supabaseClient(supabaseAccessToken as string);

		const { data, error } = await supabase
			.from("brands")
			.select()
			.eq("slug", brandSlug);

		if (error) {
			console.log(error);
			setIsLoading(false);
			return;
		}

		if (data && data.length > 0) {
			setBrandSlugError(["This slug is taken"]);
			setBrandSlugConfirmed(false);
		} else {
			setBrandSlugConfirmed(true);
		}

		setIsLoading(false);
	}, 300); // 300ms delay

	const handleBrandSlugChange = (value: string) => {
		setBrandSlug(value);
		setBrandSlugError([]);

		if (value.length > 3) {
			checkSlugAvailability();
		}
	};

	return (
		<>
			<main className="mx-auto flex min-h-full w-full max-w-screen-xl flex-col gap-6 p-8 px-4">
				<div className="mx-auto w-full max-w-xl">
					<Steps
						items={stepsItems}
						activeStep={step}
						color="success"
					/>
				</div>
				{step == 1 ? (
					<div className="mx-auto flex w-full max-w-xl flex-col gap-6">
						<h1 className="text-4xl font-bold">
							Jumpstart your brand with MarkAI
						</h1>
						<p className="text-xl">
							We&apos;ll help you on your brands journey to
							success. Simply fill out the forms bellow and
							we&apos;ll do the rest.
						</p>
						{/* Brand Slug */}
						<h1 className="text-2xl font-bold">
							Let&apos;s start with a brand slug
						</h1>
						<p>
							Provide a slug of at least 3 characters. This will
							be used to identify your brand.
						</p>
						<Input
							isRequired={true}
							label="Brand Slug"
							placeholder="markai"
							className="w-full"
							value={brandSlug}
							onChange={(e) =>
								handleBrandSlugChange(e.target.value)
							}
							errorMessage={brandSlugError}
							isInvalid={brandSlugError.length > 0}
						/>
						{/* Brand Name */}
						<h1 className="text-2xl font-bold">
							What is your brand name?
						</h1>
						<p>Provide a name of at least 3 characters</p>
						<Input
							isRequired={true}
							label="Brand Name"
							placeholder="markai"
							className="w-full"
							value={brandName}
							onChange={(e) =>
								handleBrandNameChange(e.target.value)
							}
							errorMessage={brandNameError}
							isInvalid={brandNameError.length > 0}
						/>
						{/* Brand Description Textarea */}
						<h1 className="text-2xl font-bold">
							What is the description of your brand?
						</h1>
						<p>Provide a description of at least 30 characters</p>
						<Textarea
							isRequired={true}
							minRows={5}
							onChange={(e) =>
								handleBrandDescriptionChange(e.target.value)
							}
							value={brandDescription}
							label="Describe your business"
							placeholder="Empowering brands with AI-driven insights and tools."
							className="w-full"
							errorMessage={brandDescriptionError}
							isInvalid={brandDescriptionError.length > 0}
						/>
						{/* Brand Website */}
						<h1 className="text-2xl font-bold">
							What is your brand website URL?
						</h1>
						<p>Provide a valid URL</p>
						<Input
							label="Brand Website URL"
							placeholder="https://markai.umutyildirim.com"
							className="w-full"
							value={brandWebsiteUrl}
							onChange={(e) => setBrandWebsiteUrl(e.target.value)}
						/>
						<h1 className="text-2xl font-bold">
							Select your brand industry
						</h1>
						<p>Select an industry that best describes your brand</p>
						<div className="flex flex-col gap-4">
							<Select
								label="Your brand industry"
								isRequired={true}
								placeholder="Select an industry"
								selectedKeys={brandIndustry}
								className="w-full"
								onChange={handleBrandIndustrySelectionChange}
								errorMessage={
									brandIndustriesError.length > 0
										? "Please select an industry"
										: ""
								}
							>
								{brandIndustries.map((industries) => (
									<SelectItem
										key={industries.value}
										value={industries.value}
									>
										{industries.label}
									</SelectItem>
								))}
							</Select>
						</div>
						<div className="flex w-full flex-row items-center gap-4">
							<Button
								as={Link}
								href="/dashboard"
								color="default"
								className="w-full"
							>
								Go Back to Dashboard
							</Button>
							<Button
								onClick={() => handleProgressions()}
								color="success"
								className="w-full"
							>
								Proceed
							</Button>
						</div>
					</div>
				) : (
					""
				)}
				{step == 2 ? (
					<div className="mx-auto flex w-full max-w-xl flex-col gap-6">
						<h1 className="text-2xl font-bold">
							Select your employee size
						</h1>
						<div className="flex flex-col gap-3">
							<RadioGroup
								value={brandEmployees}
								color="success"
								isRequired={true}
								errorMessage={brandEmployeesError}
								onValueChange={
									handleBrandEmployeesSelectionChange
								}
							>
								<Radio value="self">Self-employed</Radio>
								<Radio value="1-10">1-10</Radio>
								<Radio value="11-50">11-50</Radio>
								<Radio value="51-200">51-200</Radio>
								<Radio value="201-500">201-500</Radio>
								<Radio value="501-1000">501-1000</Radio>
								<Radio value="1001-5000">1001-5000</Radio>
								<Radio value="5001-10,000">5001-10,000</Radio>
								<Radio value="10,001+">10,001+</Radio>
							</RadioGroup>
						</div>
						<h1 className="text-2xl font-bold">
							Add your brand keywords
						</h1>
						<div className="flex flex-col gap-3">
							<Input
								isRequired={true}
								label="Brand Keywords"
								placeholder="airplane, travel, flight, etc."
								className="w-full"
								value={brandKeywords}
								onChange={(e) =>
									handleBrandKeywordsChange(e.target.value)
								}
								errorMessage={brandKeywordsError}
								isInvalid={brandKeywordsError.length > 0}
							/>
						</div>
						<h1 className="text-2xl font-bold">
							Add your brand social media links
						</h1>
						<div className="flex flex-col gap-3">
							{/* Linkedin, Instagam, Facebook, TikTok, X(Twitter) */}
							<Input
								label="LinkedIn"
								placeholder="https://linkedin.com/company/your-brand"
								className="w-full"
								onChange={(e) =>
									setBrandSocialMediaLinks({
										...brandSocialMediaLinks,
										linkedin: e.target.value,
									})
								}
							/>
							<Input
								label="Instagam"
								placeholder="https://instagram.com/your-brand"
								className="w-full"
								onChange={(e) =>
									setBrandSocialMediaLinks({
										...brandSocialMediaLinks,
										instagram: e.target.value,
									})
								}
							/>
							<Input
								label="Facebook"
								placeholder="https://facebook.com/your-brand"
								className="w-full"
								onChange={(e) =>
									setBrandSocialMediaLinks({
										...brandSocialMediaLinks,
										facebook: e.target.value,
									})
								}
							/>
							<Input
								label="TikTok"
								placeholder="https://www.tiktok.com/@google"
								className="w-full"
								onChange={(e) =>
									setBrandSocialMediaLinks({
										...brandSocialMediaLinks,
										tiktok: e.target.value,
									})
								}
							/>
							<Input
								label="X(Twitter)"
								placeholder="https://www.twitter.com/google"
								className="w-full"
								onChange={(e) =>
									setBrandSocialMediaLinks({
										...brandSocialMediaLinks,
										twitter: e.target.value,
									})
								}
							/>
						</div>
						<div className="flex w-full flex-row items-center gap-4">
							<Button
								onClick={() => setStep(1)}
								color="default"
								className="w-full"
							>
								Go Back
							</Button>
							<Button
								onClick={() => handleProgressions()}
								color="success"
								className="w-full"
							>
								Proceed
							</Button>
						</div>
					</div>
				) : (
					""
				)}
				{step == 3 ? (
					<div className="mx-auto flex w-full max-w-xl flex-col gap-6">
						<h1 className="text-2xl font-bold">
							Confirm your brand details
						</h1>
						<div className="flex flex-col gap-3 break-all p-3">
							<div className="flex flex-row gap-2">
								<p>
									{" "}
									<p className="font-bold">Name:</p>
									{brandName}
								</p>
							</div>
							<div className="flex flex-row gap-2">
								<p>
									<p className="font-bold">Description:</p>
									{brandDescription}
								</p>
							</div>
							<div className="flex flex-row gap-2">
								<p>
									{" "}
									<p className="font-bold">Website:</p>
									{brandWebsiteUrl}
								</p>
							</div>
							<div className="flex flex-row gap-2">
								<p className="font-bold">Industry:</p>
								{
									// Convert Set to Array and map through it.
									Array.from(brandIndustry).map(
										(industryValue) => {
											// Find the corresponding industry label from brandIndustries data
											const industry =
												brandIndustries.find(
													(industry) =>
														industry.value ===
														industryValue
												);
											return (
												<p key={industryValue}>
													{industry
														? industry.label
														: ""}
												</p>
											);
										}
									)
								}
							</div>

							<div className="flex flex-row gap-2">
								<p>
									{" "}
									<p className="font-bold">Employees:</p>
									{brandEmployees}
								</p>
							</div>
							<div className="flex flex-row gap-2">
								<p>
									{" "}
									<p className="font-bold">Keywords:</p>
									{brandKeywords}
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<p className="font-bold">Social Media Links:</p>
								<ul>
									<li>
										<p>
											LinkedIn:{" "}
											{brandSocialMediaLinks.linkedin}
										</p>
									</li>
									<li>
										<p>
											Instagram:{" "}
											{brandSocialMediaLinks.instagram}
										</p>
									</li>
									<li>
										<p>
											Facebook:{" "}
											{brandSocialMediaLinks.facebook}
										</p>
									</li>
									<li>
										<p>
											TikTok:{" "}
											{brandSocialMediaLinks.tiktok}
										</p>
									</li>
									<li>
										<p>
											Twitter:{" "}
											{brandSocialMediaLinks.twitter}
										</p>
									</li>
								</ul>
							</div>
						</div>
						<div className="flex w-full flex-row items-center gap-4">
							<Button
								onClick={() => setStep(2)}
								color="default"
								className="w-full"
							>
								Go Back
							</Button>
							<Button
								onClick={() => handleProgressions()}
								color="success"
								className="w-full"
								isDisabled={submitNewBrand}
							>
								Submit
							</Button>
						</div>
					</div>
				) : (
					""
				)}
			</main>
		</>
	);
}
