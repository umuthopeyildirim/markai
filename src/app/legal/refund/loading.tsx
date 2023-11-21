import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			<Spinner color="success" size="lg" label="Loading..." />
		</div>
	);
}
