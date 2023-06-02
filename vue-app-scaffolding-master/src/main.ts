import './style/main.scss';

import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import { fetchUserLocale, fetchAdjustableNames } from '@topdesk/i18n-features';
import { adjustableNames, api, i18n, pinia, router, widgets, resolveLegacyLocales, updateLanguage } from './vue-setup';

launch();

async function launch() {
	// Init the translations
	const { locale, adjustableNameOptions } = resolveLegacyLocales(await fetchMockLocalization());

	await updateLanguage(locale);

	createApp(RouterView)
			.use(adjustableNames, { options: adjustableNameOptions })
			.use(api)
			.use(i18n)
			.use(pinia)
			.use(router)
			.use(widgets)
			.mount(document.body);
}

async function fetchMockLocalization() {
	const en = {
		branch: { option: 1, singular: 'Branch', plural: 'Branches' },
		// Name may be used when there's no separate singular or plural
		configurationmanagement: { option: 0, name: 'Config Management' }, // option: 0 means custom
		incident: { option: 2 }, // Custom translations won't be used unless option: 0 is declared
		location: { option: 1 },
		person: { option: 0, singular: 'Puny human', plural: 'Puny humans' }, // This is used by the examples
	};
	const pt = {
		...en,
		person: { option: 0, singular: 'Humano insignificante', plural: 'Humanos insignificantes' },
	};
	return { locale: 'en', adjustableNameOptions: { en, pt } };
}

async function fetchTosLocalization() { // eslint-disable-line @typescript-eslint/no-unused-vars
	const tasPublicPath = `${process.env.API_PATH}internal-tas-proxy/`;
	const [locale, adjustableNameOptions] = await Promise.all([
		// Returns a single user locale, such as "en"
		fetchUserLocale({ token: false, tasPublicPath }),
		// Tied to a feature, called the "Adjustable Names". Customers can pick some of the jargon used by TOPdesk
		// Eg. the word "call" in our translations can also be called a "ticket" or an "incident", even something
		// completely custom typed-in by our users. This convenience function fetches the customer preferences from
		// a REST API.
		fetchAdjustableNames({ token: false, tasPublicPath }),
	]);
	return { locale, adjustableNameOptions };
}
