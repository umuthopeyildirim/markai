import { LandingHero, LandingFeatures, LandingFAQ } from "@/components/landing";

export default function Home() {
	return (
		<main className="container mx-auto max-w-7xl flex-grow px-6">
			{/* Landing Hero */}
			<LandingHero />
			{/* Features */}
			<LandingFeatures />
			{/* FAQ */}
			<LandingFAQ />
		</main>
	);
}
