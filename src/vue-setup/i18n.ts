import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

// Translations written by our devs
import dev from '@topdesk/translations__td-asset-management/dev.json';
// The official English translations
import en from '@topdesk/translations__td-asset-management/en.json';

// The magic comments give hints to the bundler what Json files to ignore and how to name them
const importTranslation = (bundleName: string) => import(
	/* webpackExclude: /package(-lock)?\.json$/ */
	/* webpackChunkName: "lang-[request]" */
	`@topdesk/translations__td-asset-management/${bundleName}.json`).then(jsonModule => jsonModule.default);

/** Some Json files are incomplete and require a fallback Json to be loaded */
const BundleFallbacks: Record<string, string> = {
	'en-US': 'en', /* US English requires the British as a fallback */
	'pt': 'pt-BR', /* Portugal Portuguese requires the Brazilian dialect as a fallback */
};
const bundleNameOf = (locale: string) => locale === 'en-GB' ? 'en' : locale;

const enGB = { ...dev, ...en };

export const i18n = createI18n({
	// Jest doesn't know about the __VUE_I18N_LEGACY_API__ build flag already disabling legacy mode
	legacy: false,
	// Make sure to set the locale with the dialect included.
	// Otherwise date / number / etc local formatting won't work properly.
	locale: 'en-GB',
	fallbackLocale: 'en-GB',
});
i18n.global.setLocaleMessage('en-GB', enGB);

type FetchTranslationsOptions = {
	/** Name of the resource bundle to load in case it's not the same as the locale */
	bundleName?: string;
};

/** Lazy-load translations then update the locale */
export async function updateLanguage(locale: string, { bundleName = bundleNameOf(locale) }: FetchTranslationsOptions = {}) {
	const translation = await importTranslation(bundleName);
	// Translations may require a fallback
	const bundleFallback = BundleFallbacks[bundleName] ?? null;
	const translationFallback = bundleFallback ? await importTranslation(bundleFallback) : {};
	const translationResolved = { ...translation, ...translationFallback };

	i18n.global.setLocaleMessage(locale, translationResolved);
	await nextTick();
	i18n.global.locale.value = locale;
}
