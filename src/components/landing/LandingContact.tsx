"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";

function LandingContact() {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
	});
	const [formResponse, setFormResponse] = useState({
		type: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleFormSubmit = () => {
		if (form.firstName === "") {
			setErrors({
				...errors,
				firstName: "First name is required",
			});
		}
		if (form.lastName === "") {
			setErrors({
				...errors,
				lastName: "Last name is required",
			});
		}
		// regex for form validation
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailRegex.test(form.email)) {
			setErrors({
				...errors,
				email: "Email is invalid",
			});
		}
		if (form.email === "") {
			setErrors({
				...errors,
				email: "Email is required",
			});
		}
		if (form.message === "") {
			setErrors({
				...errors,
				message: "Message is required",
			});
		}
		if (
			form.firstName !== "" &&
			form.lastName !== "" &&
			form.email !== "" &&
			form.message !== ""
		) {
			setIsSubmitting(true);
			// send request to api/contact-us-discord
			fetch("/api/contact-us-discord", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						setFormResponse({
							type: "error",
							message: data.error,
						});
						setIsSubmitting(false);
						return;
					}
					setFormResponse({
						type: "success",
						message:
							"We have received your message. Thank you! Stay tune and we will get back to you soon.",
					});
					setIsSubmitting(false);
				})
				.catch((err) => {
					setFormResponse({
						type: "error",
						message: err.message,
					});
					setIsSubmitting(false);
				});
		}
	};
	return (
		<>
			<section id="contact">
				<div className="mx-auto max-w-screen-xl gap-12 px-4 py-28 md:px-8">
					<div className="mx-auto max-w-4xl space-y-5 text-center">
						<h2 className="mx-auto text-4xl md:text-6xl ">
							Have any more questions?{" "}
							<span className="bg-gradient-to-t from-success-300 to-success-500 bg-clip-text text-transparent">
								Send it our way…
							</span>
						</h2>
						<p className="mx-auto max-w-2xl text-xl">
							and let&apos;s dive deeper into{" "}
							<span className="font-bold">MarkAI</span> together.
						</p>
					</div>
					<div className="mx-auto mt-12 max-w-lg">
						<form
							onSubmit={(e) => e.preventDefault()}
							className="space-y-5"
						>
							<div className="flex flex-col items-center gap-x-6 gap-y-5 sm:flex-row [&>*]:w-full">
								<div>
									<Input
										type="text"
										label="First name"
										isRequired={true}
										isInvalid={
											errors.firstName ? true : false
										}
										errorMessage={errors.firstName}
										onChange={(e) => {
											setForm({
												...form,
												firstName: e.target.value,
											});
											setErrors({
												...errors,
												firstName: "",
											});
										}}
									/>
								</div>
								<div>
									<Input
										type="text"
										label="Last name"
										isRequired={true}
										errorMessage={errors.lastName}
										onChange={(e) => {
											setForm({
												...form,
												lastName: e.target.value,
											});
											setErrors({
												...errors,
												lastName: "",
											});
										}}
									/>
								</div>
							</div>
							<div>
								<Input
									type="email"
									label="Email address"
									isRequired={true}
									errorMessage={errors.email}
									onChange={(e) => {
										setForm({
											...form,
											email: e.target.value,
										});
										setErrors({
											...errors,
											email: "",
										});
									}}
								/>
							</div>
							<div>
								<Textarea
									label="Message"
									placeholder="Enter your message"
									isRequired={true}
									errorMessage={errors.message}
									onChange={(e) => {
										setForm({
											...form,
											message: e.target.value,
										});
										setErrors({
											...errors,
											message: "",
										});
									}}
								/>
							</div>
							{formResponse.type !== "" ? (
								<div
									className={`text-center text-${
										formResponse.type === "success"
											? "success"
											: "danger"
									}`}
								>
									{formResponse.message}
								</div>
							) : (
								""
							)}
							<Button
								color="success"
								size="md"
								className={`w-full ${
									isSubmitting ? "cursor-not-allowed" : ""
								}`}
								isDisabled={isSubmitting}
								onClick={() => handleFormSubmit()}
							>
								Send Message
							</Button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}

export default LandingContact;
