import { Sidebar } from "@/components";

export default function SettingsLayout({
	children,
	params: { id },
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	return (
		<>
			<div className="flex flex-1 flex-col">
				<div className="flex h-full flex-1 flex-col md:gap-12">
					<div className="border-b border-divider">
						<div className="mx-auto max-w-screen-xl px-6 py-12">
							<h1 className="text-4xl font-medium">Settings</h1>
							<p className="text-gray-500">
								Manage your brand settings here.
							</p>
						</div>
					</div>
					<div className="mb-12 w-full">
						<div className="mx-auto max-w-screen-xl px-6">
							<div className="flex flex-row gap-4">
								<div className="hidden md:block">
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
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
