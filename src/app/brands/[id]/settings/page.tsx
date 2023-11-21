import { Sidebar } from "@/components";
import GeneralSettingsPage from "./(subsettings)/general/page";

export default function Page({ params: { id } }: { params: { id: string } }) {
	return (
		<>
			<div className="hidden md:block">
				<GeneralSettingsPage />
			</div>
			<div className="w-full md:hidden">
				<Sidebar
					items={[
						{
							name: "General",
							href: `/brands/${id}/settings/general`,
							icon: "home",
						},
						{
							name: "Integration",
							href: `/brands/${id}/settings/integration`,
							icon: "integration",
						},
					]}
				/>
			</div>
		</>
	);
}
