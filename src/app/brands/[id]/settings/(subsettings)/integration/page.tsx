"use client";
import {
	Divider,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Button,
} from "@nextui-org/react";
import Image from "next/image";

export default function Page() {
	return (
		<>
			<div className="flex flex-1 flex-col gap-8">
				<Card className="border border-default-200 bg-default-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<Image
								src="/images/google_analytics.svg"
								alt="Google Analytics"
								width={40}
								height={40}
							/>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							<h1 className="text-lg">Google Analytics(WIP)</h1>
							<p className="text-sm">
								Google Analytics gives you the tools you need to
								analyze data for your business in one place, so
								you can make smarter decisions.
							</p>
						</div>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end px-5">
						<Button color="success" variant="ghost" isDisabled>
							Connect
						</Button>
					</CardFooter>
				</Card>
				<Card className="border border-default-200 bg-default-50">
					<CardHeader className="p-5">
						<div className="flex flex-col">
							<Image
								src="/images/google_drive.svg"
								alt="Google Analytics"
								width={40}
								height={40}
							/>
						</div>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="flex flex-col gap-2">
							<h1 className="text-lg">Google Drive (WIP)</h1>
							<p className="text-sm">
								Google Drive is a file storage and
								synchronization service developed by Google. By
								linking your Google Drive account, you can ask
								MarkAI to analyze your files.
							</p>
						</div>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end px-5">
						<Button color="success" variant="ghost" isDisabled>
							Connect
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
