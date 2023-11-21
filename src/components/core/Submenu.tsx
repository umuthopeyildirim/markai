"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import {
	useMotionValueEvent,
	useScroll,
	motion,
	useMotionValue,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem } from "@/types/menu";
import { MdHome, MdChatBubble, MdCreate, MdSettings } from "react-icons/md";
import { FaBrain } from "react-icons/fa6";
import { SiSimpleanalytics } from "react-icons/si";

interface SubmenuProps {
	items: MenuItem[];
	position?: "sticky" | "static";
}

const Submenu: FC<SubmenuProps> = ({ items, position }) => {
	const router = useRouter();
	const pathname = usePathname();

	// Refs
	const tabsRef = useRef<HTMLDivElement>(null);

	// State Hooks
	const [isLogoVisible, setIsLogoVisible] = useState<boolean>(false);
	const [textColor, setTextColor] = useState<string>("text-default-500");
	const [selected, setSelected] = useState<string>(
		items
			.findIndex((item, index) =>
				index == 0
					? item.href === pathname
					: RegExp(item.href).test(pathname)
			)
			.toString()
	);

	// Custom Hooks and Motion Values
	const { scrollY } = useScroll();
	const { scrollX } = useScroll({ container: tabsRef });
	const logoXPosition = useMotionValue(scrollX.get());

	// Variants
	const logoVariants = {
		visible: { opacity: 1, y: 0 },
		hidden: { opacity: 0, y: "-100%" },
	};

	useMotionValueEvent(scrollY, "change", (latest) => {
		setIsLogoVisible(latest > 81);
	});

	useMotionValueEvent(scrollX, "change", (latest) => {
		logoXPosition.set(latest * -1);
	});

	const handleIconSelection = (icon: string) => {
		switch (icon) {
			case "home":
				return <MdHome />;
			case "chat":
				return <MdChatBubble />;
			case "creative":
				return <MdCreate />;
			case "knowledge-base":
				return <FaBrain />;
			case "analytics":
				return <SiSimpleanalytics />;
			case "settings":
				return <MdSettings />;
			default:
				return <MdHome />;
		}
	};

	const handleSelectionChange = (value: React.Key): void => {
		value = value.toString();

		setSelected(value);

		if (pathname === items[parseInt(value)].href) {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
			return;
		}

		router.push(items[parseInt(value)].href);
	};

	useEffect(() => {
		const index = items.findIndex((item) => item.href === pathname);
		if (index !== -1) {
			setSelected(index.toString());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	useEffect(() => {
		setTextColor("text-success");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div
				className={`relative z-50 flex w-full flex-col overflow-hidden border-b border-divider ${
					position === "static"
						? position
						: "sticky top-0 bg-background/70 backdrop-blur-lg backdrop-saturate-150"
				}`}
			>
				<motion.button
					className="absolute z-10 ml-4 h-12 w-6 -translate-y-full items-center justify-center opacity-0 md:ml-8"
					animate={isLogoVisible ? "visible" : "hidden"}
					variants={logoVariants}
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
					style={{ x: logoXPosition }}
				>
					<svg
						aria-label="Vercel Logo"
						fill="#fff"
						viewBox="0 0 75 65"
						width="20"
					>
						<path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
					</svg>
				</motion.button>
				<div className="w-full">
					<Tabs
						ref={tabsRef}
						variant="underlined"
						aria-label="options"
						selectedKey={selected}
						onSelectionChange={handleSelectionChange}
						classNames={{
							base: "h-12 overflow-auto w-full",
							tabList: `w-full rounded-none py-0 h-full px-4 md:px-8 transition-all duration-300 ${
								isLogoVisible ? "pl-14" : ""
							}`,
							tab: "max-w-fit",
							cursor: "w-full bg-success",
							tabContent: `group-data-[selected=true]:${textColor}`,
						}}
					>
						{items.map((item, index) => (
							<Tab
								className="h-full"
								key={`${index}`}
								title={
									<div className="flex items-center space-x-2">
										{handleIconSelection(item.icon)}
										<span>{item.name}</span>
									</div>
								}
							/>
						))}
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default Submenu;
