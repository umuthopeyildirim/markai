import { Submenu } from "@/components";
import { MenuItem } from "@/types/menu";

export default function BrandDetailsLayout({
	children,
	params: { id },
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const submenuItems: MenuItem[] = [
		{ name: "Overview", href: `/brands/${id}`, icon: "home" },
		{ name: "Chat", href: `/brands/${id}/chat`, icon: "chat" },
		// { name: "Creative", href: `/brands/${id}/creative`, icon: "creative" },
		{
			name: "Knowledge Base",
			href: `/brands/${id}/knowledge-base`,
			icon: "knowledge-base",
		},
		// {
		// 	name: "Analytics",
		// 	href: `/brands/${id}/analytics`,
		// 	icon: "analytics",
		// },
		{
			name: "Settings",
			href: `/brands/${id}/settings`,
			icon: "settings",
		},
	];

	return (
		<>
			<Submenu items={submenuItems} />
			{children}
		</>
	);
}
