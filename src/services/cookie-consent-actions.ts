'use server';

import { defaultCookieConsent } from '@/types/cookies.d';
import { cookies } from 'next/headers';

export async function onCookieAccept(
	value: Record<string, boolean> = defaultCookieConsent
): Promise<void> {
	cookies().set('cookie-consent', JSON.stringify(value), {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
	});
}

export async function getCookieConcent(): Promise<string | undefined> {
	return cookies().get('cookie-consent')?.value;
}
