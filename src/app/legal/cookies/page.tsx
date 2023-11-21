"use client";

import { CookiePreferencesList } from "@/components";
import { getCookieConcent, onCookieAccept } from "@/services";
import { defaultCookieConsent } from "@/types/cookies.d";
import { Button, Link, Spinner } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";

// This is not a real cookie policy page, it is just a template
// You can use this page as a template for your cookie policy page
const CookiesPage: FC = () => {
	const [isPreferencesLoaded, setIsPreferencesLoaded] =
		useState<boolean>(false);
	const [preferences, setPreferences] = useState<Record<string, boolean>>({});

	useEffect(() => {
		getCookieConcent().then((res) => {
			setPreferences(res ? JSON.parse(res!) : defaultCookieConsent);
			setIsPreferencesLoaded(true);
		});
	}, []);

	return (
		<main className="mx-auto flex max-w-screen-xl flex-col !gap-4 px-4 md:p-8 ">
			<h1 className="text-4xl">Cookie Policy (Template)</h1>
			<p>Last updated: September 9, 2023</p>
			<p className="font-bold">
				Cookies are small text files that are stored on your device when
				you visit a website. We use cookies to provide a better user
				experience, analyze how users interact with our website, and to
				personalize content and ads.
			</p>
			<p>
				We use cookies to provide a better experience on our website and
				to understand how visitors interact with our content. Here are
				the cookies we use:
			</p>
			<h3 className="text-xl">Vercel Analytics</h3>
			<p>
				We use Vercel Analytics to collect information about how
				visitors use our website. This information is used to create
				reports and help us improve the website. Vercel Analytics
				cookies collect information in an anonymous form, including the
				number of visitors to the website and blog, where visitors have
				come to the website from and the pages they visited.
			</p>
			<h3 className="text-xl">Lemon Squeezy (Required)</h3>
			<p>
				We use Lemon Squeezy as our payment gateway which allows
				websites to process online payments securely and easily. When a
				user makes a payment on your website using Lemon Squeezy, their
				payment information (such as their credit card details) needs to
				be stored temporarily while the payment is being processed.
				Please review the&nbsp;
				{
					<Link
						href="https://www.lemonsqueezy.com/privacy"
						color="success"
						underline="hover"
					>
						https://www.lemonsqueezy.com/privacy
					</Link>
				}
				&nbsp;for Lemon Squeezy cookies.
			</p>
			<p>
				To enable this, Lemon Squeezy uses cookies to store information
				about the user&apos;s session, such as their session ID and the
				status of their payment. These cookies are necessary for the
				payment process to work properly, and they are stored on the
				user&apos;s browser until the payment process is complete.
			</p>
			<p>
				In addition to payment-related cookies, Lemon Squeezy may also
				use other cookies on your website to improve performance,
				analyze how users interact with the website, and provide
				relevant advertising. However, these additional cookies are
				optional and you can choose to disable them if you prefer. Lemon
				Squeezy&apos;s use of cookies is subject to their own privacy
				policy, which you should review if you have any specific
				concerns.
			</p>
			<h3 className="text-xl">Authentication (Required)</h3>
			<p>
				We use clerk to authenticate users on our application. Clerk is
				a library which allows users to authenticate using various third
				party services, such as google, which makes it easy to sign up
				and start using our application.
			</p>
			<h1 className="mb-4 text-4xl">Cookie Preferences</h1>
			{!isPreferencesLoaded && (
				<div className="flex flex-row justify-center">
					<Spinner color="success" />
				</div>
			)}
			{isPreferencesLoaded && (
				<div className="grid grid-cols-1 sm:grid-cols-2">
					<div className="cols flex flex-col gap-8">
						<CookiePreferencesList
							data={preferences}
							onDataChange={setPreferences}
						/>
						<div className="flex flex-row justify-start">
							<Button
								color="success"
								variant="solid"
								onPress={() => {
									onCookieAccept(preferences);
								}}
							>
								Confirm my choices
							</Button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default CookiesPage;
