"use client";

import { Card, CardBody, CardProps } from "@nextui-org/react";
import React, { FC } from "react";

export type EaseInCardProps = CardProps & {
	mainContent: React.ReactNode;
	easeInContent: React.ReactNode;
	mainContentBackground?: string;
	easeInDuration?: number;
	easeInDelay?: number;
};

const EaseInCard: FC<EaseInCardProps> = ({
	mainContent,
	mainContentBackground = "bg-transparent",
	easeInContent,
	easeInDuration = 500,
	easeInDelay = 0,
	...props
}) => {
	const duration = `duration[-${easeInDuration}ms]`;
	const delay = `delay-[${easeInDelay}ms]`;
	props.className = `group min-h-[15rem] overflow-hidden ${props.className}`;

	return (
		<div className="grid">
			<Card {...props}>
				<div
					className={`flex h-full w-full items-center justify-center ${mainContentBackground}`}
				>
					{mainContent}
				</div>
				<CardBody
					className={`h-0 translate-y-full overflow-hidden py-0 transition-all group-hover:mb-4 group-hover:h-fit group-hover:translate-y-0 group-hover:py-5 ${[
						duration,
						delay,
					].join(" ")}`}
				>
					{easeInContent}
				</CardBody>
			</Card>
		</div>
	);
};

export default EaseInCard;
