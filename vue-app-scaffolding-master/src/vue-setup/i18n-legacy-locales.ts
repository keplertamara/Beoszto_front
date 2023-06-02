import { type AdjustableNames } from '@topdesk/i18n-features';

/** Historically some legacy locales imply different dialects than standard tooling would fall back to */
const LocaleMapping = [
	{ legacyName: 'en', resolvesTo: 'en-GB' },
];

/**
 * Resolves legacy locales to prevent browsers and accessibility tooling misinterpreting them.
 * For example due to historical reasons "en" means British English in our legacy system.
 */
export function resolveLegacyLocales(
	{ locale, adjustableNameOptions }:
	{ locale: string; adjustableNameOptions: AdjustableNames },
) {
	const localeResolved = resolveLocale(locale);
	const adjustableNameOptionsResolved = mapKeys(resolveLocale, adjustableNameOptions) as AdjustableNames;
	return {
		bundleName: locale,
		locale: localeResolved,
		adjustableNameOptions: adjustableNameOptionsResolved,
	};
}

function resolveLocale(legacyLocale: string) {
	const { resolvesTo } = LocaleMapping.find(({ legacyName }) => legacyName === legacyLocale) ?? {};
	return resolvesTo ?? legacyLocale;
}

function mapKeys<T extends Record<string, unknown>>(fn: (key: string) => string, object: T) {
	return Object.fromEntries(Object.entries(object)
			.map(([key, value]) => [fn(key), value]));
}
