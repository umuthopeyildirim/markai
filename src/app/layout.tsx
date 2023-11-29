import "./globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Header, Footer } from "@/components";
import { dark } from "@clerk/themes";
import { cookies } from "next/headers";
import CookieConsentModal from "@/components/cookie/CookieConsentModal";
import { datadogRum } from "@datadog/browser-rum";

// You can use Datadog to track user interactions, resources, and long tasks.
datadogRum.init({
	applicationId: "19e6c6e6-86fd-4a2c-85d3-968be9bcb514",
	clientToken: "pub46f09848e8393f3fdc9993d397b8787a",
	site: "datadoghq.com",
	service: "markai",
	env: process.env.NODE_ENV,
	version: "0.1.0",
	sessionSampleRate: 100,
	sessionReplaySampleRate: 20,
	trackUserInteractions: true,
	trackResources: true,
	trackLongTasks: true,
	defaultPrivacyLevel: "mask-user-input",
});

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
	colorScheme: "dark",
};

export const metadata: Metadata = {
	metadataBase: new URL("https://markai.umutyildirim.com"),
	title: {
		default: "MarkAI",
		template: "%s | MarkAI",
	},
	description: "Empowering brands with AI-driven insights and tools.",
	applicationName: "MarkAI",
	authors: [
		{ name: "Umut YILDIRIM", url: "https://umutyildirim.com" },
		{ name: "Burak YILDIRIM", url: "https://burakyildirim.me" },
	],
	keywords: [
		"MarkAI",
		"marketing",
		"chatgpt",
		"crm",
		"chatbot",
		"ai",
		"artificial intelligence",
	],
	robots: "index, follow",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://markai.umutyildirim.com",
		title: "MarkAI",
		description: "Empowering brands with AI-driven insights and tools.",
		siteName: "MarkAI",
		images: [
			{
				url: "https://markai.umutyildirim.com/images/og-image.png",
				width: 1200,
				height: 630,
				alt: "MarkAI",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MarkAI",
		creator: "@MarkAI",
		images: "https://markai.umutyildirim.com/images/og-image.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = cookies();
	let cookieConsent = cookieStore.get("cookie-consent")?.value;
	// {"strictly-necessary":true,"analytics":true}
	// get Analytics cookie and check if it's true
	let isConsent = cookieConsent
		? JSON.parse(cookieConsent)["analytics"]
		: null;

	if (isConsent === true) {
		// You can use Datadog to track user interactions, resources, and long tasks. For this demo it is not needed.
		// datadogRum.startSessionReplayRecording();
	}
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				variables: {
					colorPrimary: "hsl(145deg 78% 44%)",
				},
				layout: {
					privacyPageUrl: "/legal/privacy",
					termsPageUrl: "/legal/terms",
					helpPageUrl: "/help",
				},
			}}
		>
			<html lang="en" className="scroll-smooth dark">
				<body
					className={`${inter.className} flex min-h-screen flex-col selection:bg-success-600/70 selection:text-white`}
				>
					<Providers>
						{isConsent === null && <CookieConsentModal />}
						<Header />
						<div className="flex flex-1 flex-col bg-hero-pattern bg-left bg-no-repeat">
							<div className="flex flex-1 flex-col">
								{children}
							</div>
							<Footer />
						</div>
					</Providers>
					{isConsent === true ? <Analytics /> : null}
				</body>
			</html>
		</ClerkProvider>
	);
}
