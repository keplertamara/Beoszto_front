import { type I18n } from 'vue-i18n';
import { type Router } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { type GlobalMountOptions } from '@vue/test-utils/dist/types';
import { API_KEY, adjustableNames, i18n as i18nDefault, widgets } from 'src/vue-setup';
import { type Api } from 'src/api';
import { ApiMock } from './api-mock';

type Options = {
	api?: Api;
	router?: Router;
	i18n?: I18n<unknown, unknown, unknown, unknown, boolean>;
	provide?: GlobalMountOptions['provide'];
}

export function setupOptions({ api, i18n = i18nDefault as NonNullable<Options['i18n']>, router, provide = {} }: Options = {}) {
	const pinia = createTestingPinia({ stubActions: api === undefined });
	const plugins: GlobalMountOptions['plugins'] = [adjustableNames, i18n, pinia, widgets];
	provide = { ...provide, [API_KEY as symbol]: api ?? ApiMock() };
	if (router) { plugins.push(router); }
	return { global: { renderStubDefaultSlot: true, plugins, provide } };
}

