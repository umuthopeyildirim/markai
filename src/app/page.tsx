import {
	LandingHero,
	// LandingChat,
	// LandingBetaAccess,
	LandingFeatures,
} from "@/components/landing";

export default function Home() {
	return (
		<main className="container mx-auto max-w-7xl flex-grow px-6">
			{/* Landing Hero */}
			<LandingHero />
			{/* Chat demo with example company Maybe Google or Facebook? */}
			{/* <LandingChat /> */}
			{/* Features */}
			{/* TODO: Change these to current features */}
			<LandingFeatures />
			{/* Access to Beta */}
			{/* <LandingBetaAccess /> */}
		</main>
	);
}
