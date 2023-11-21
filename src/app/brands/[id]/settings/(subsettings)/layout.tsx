import { BsChevronLeft } from "react-icons/bs";
import Link from "next/link";

export default function SettingsLayoutWithBackButton({
	children,
	params: { id },
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	return (
		<>
			<div className="flex flex-col gap-6">
				<div className="-mx-6 border-b border-divider md:hidden">
					<div className="mx-auto max-w-screen-xl p-6">
						<Link href={`/brands/${id}/settings`}>
							<div className="flex flex-row items-center gap-2">
								<div className="text-sm font-semibold">
									<BsChevronLeft />
								</div>
								<h1 className="text-sm font-semibold">
									Project Settings
								</h1>
							</div>
						</Link>
					</div>
				</div>
				{children}
			</div>
		</>
	);
}
