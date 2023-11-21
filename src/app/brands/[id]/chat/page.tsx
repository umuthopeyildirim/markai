import { BrandChatPage } from "@/components/brands/chat";

export default function Chat({ params }: { params: { id: string } }) {
	const { id } = params;
	// Chat
	return (
		<>
			<BrandChatPage brand_id={id} />
		</>
	);
}
