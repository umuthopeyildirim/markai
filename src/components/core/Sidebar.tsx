"use client";

import { FC, useState } from "react";
import { MenuItem } from "@/types/menu";
import Link from "next/link";
import { MdHome, MdAccountBalanceWallet } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { IoExtensionPuzzleSharp } from "react-icons/io5";

interface SidebarProps {
	items: MenuItem[];
	selectedItem?: number;
}

const Sidebar: FC<SidebarProps> = ({ items, selectedItem }) => {
	const [selected, setSelected] = useState<number>(selectedItem ?? 1);

	const handleIconSelection = (icon: string) => {
		switch (icon) {
			case "home":
				return <MdHome />;
			case "integration":
				return <IoExtensionPuzzleSharp />;
			case "usage":
				return <SiSimpleanalytics />;
			case "plan":
				return <MdAccountBalanceWallet />;
			default:
				return <MdHome />;
		}
	};

	return (
		<>
			<div className="flex min-w-[12rem] flex-1 flex-col justify-start md:flex-[0_0_auto]">
				<div className="sticky top-16 flex flex-col justify-start">
					{items.map((item, index) => (
						<Link
							href={item.href}
							key={index}
							onClick={() => setSelected(index + 1)}
							className={`py-6 text-sm max-md:border-b max-md:border-divider md:-ml-3 md:rounded-small md:px-3 md:py-2 md:transition-opacity md:hover:bg-default-50 md:hover:text-white ${
								selected === index + 1
									? "font-normal text-default-500 md:font-medium md:text-success"
									: "font-normal text-default-500"
							}`}
						>
							<div className="flex flex-row items-center space-x-4">
								{handleIconSelection(item.icon)}
								<p>{item.name}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default Sidebar;
