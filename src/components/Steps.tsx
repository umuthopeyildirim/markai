"use client";

import React, { FC } from "react";

interface StepsProps {
	items: string[];
	activeStep: number;
	color?:
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "danger";
}

const Steps: FC<StepsProps> = ({ items, activeStep, color = "default" }) => {
	const defaultBeforeColor: string = "max-md:before:bg-white";
	const defaultAfterColor: string = "max-md:after:bg-white";
	const colorVariants: Record<string, Record<string, string>> = {
		default: {
			beforeColor: "max-md:before:bg-default",
			afterColor: "max-md:after:bg-default",
			borderColor: "border-default",
			textColor: "text-default",
			backgroundColor: "bg-default",
		},
		primary: {
			beforeColor: "max-md:before:bg-primary",
			afterColor: "max-md:after:bg-primary",
			borderColor: "border-primary",
			textColor: "text-primary",
			backgroundColor: "bg-primary",
		},
		secondary: {
			beforeColor: "max-md:before:bg-secondary",
			afterColor: "max-md:after:bg-secondary",
			borderColor: "border-secondary",
			textColor: "text-secondary",
			backgroundColor: "bg-secondary",
		},
		success: {
			beforeColor: "max-md:before:bg-success",
			afterColor: "max-md:after:bg-success",
			borderColor: "border-success",
			textColor: "text-success",
			backgroundColor: "bg-success",
		},
		warning: {
			beforeColor: "max-md:before:bg-warning",
			afterColor: "max-md:after:bg-warning",
			borderColor: "border-warning",
			textColor: "text-warning",
			backgroundColor: "bg-warning",
		},
		danger: {
			beforeColor: "max-md:before:bg-danger",
			afterColor: "max-md:after:bg-danger",
			borderColor: "border-danger",
			textColor: "text-danger",
			backgroundColor: "bg-danger",
		},
	};

	return (
		<div className="w-full">
			<ul
				aria-label="Steps"
				className="flex items-center font-medium text-white"
			>
				{items.map((item, idx) => (
					<li
						key={idx}
						aria-current={activeStep == idx + 1 ? "step" : false}
						className="flex flex-1 last:flex-none md:items-center md:gap-x-2"
					>
						<div
							className={`relative flex w-full cursor-default flex-col gap-2 md:w-auto md:flex-row ${
								activeStep > idx + 1
									? [
											colorVariants[color].beforeColor,
											colorVariants[color].afterColor,
									  ].join(" ")
									: activeStep == idx + 1
									? [
											colorVariants[color].beforeColor,
											defaultAfterColor,
									  ].join(" ")
									: [
											defaultBeforeColor,
											defaultAfterColor,
									  ].join(" ")
							} ${
								idx != 0
									? "max-md:before:absolute max-md:before:mt-4 max-md:before:block max-md:before:h-[2px] max-md:before:w-[calc(50%_-_1rem)]"
									: "max-md:before:hidden"
							} ${
								idx != items.length - 1
									? "max-md:after:absolute max-md:after:right-0 max-md:after:mt-4 max-md:after:block max-md:after:h-[2px] max-md:after:w-[calc(50%_-_1rem)]"
									: "max-md:after:hidden"
							}`}
						>
							<div className="flex flex-col items-center gap-x-2">
								<div
									className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 ${
										activeStep > idx + 1
											? [
													colorVariants[color]
														.borderColor,
													colorVariants[color]
														.backgroundColor,
											  ].join(" ")
											: "" || activeStep == idx + 1
											? colorVariants[color].borderColor
											: ""
									}`}
								>
									<span
										className={` ${
											activeStep > idx + 1
												? "hidden"
												: "" || activeStep == idx + 1
												? colorVariants[color].textColor
												: ""
										}`}
									>
										{idx + 1}
									</span>
									{activeStep > idx + 1 ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-5 w-5 text-white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4.5 12.75l6 6 9-13.5"
											/>
										</svg>
									) : (
										""
									)}
								</div>
							</div>
							<div className="flex h-auto items-center justify-center">
								<h3
									className={`text-sm ${
										activeStep == idx + 1
											? colorVariants[color].textColor
											: ""
									}`}
								>
									{item}
								</h3>
							</div>
						</div>
						{idx < items.length - 1 && (
							<hr
								className={`block w-full border max-md:mt-4 md:mr-2 ${
									idx + 1 == items.length
										? "hidden"
										: "" || activeStep > idx + 1
										? colorVariants[color].borderColor
										: ""
								}`}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Steps;
