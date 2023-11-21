export const cookieConsentKeys: Record<string, string> = {
	strictlyNecessary: 'strictly-necessary',
	analytics: 'analytics',
};

export const acceptAllCookieConsent: Record<string, boolean> = Object.keys(
	cookieConsentKeys
).reduce((acc, key) => ({ ...acc, [cookieConsentKeys[key]]: true }), {});

export const defaultCookieConsent: Record<string, boolean> = Object.keys(
	cookieConsentKeys
).reduce(
	(acc, key) => ({
		...acc,
		[cookieConsentKeys[key]]: key === 'strictlyNecessary',
	}),
	{}
);
