import { type App, inject, type InjectionKey, watch } from 'vue';
import { adjustNames, type AdjustableNames, type ResourceBundle } from '@topdesk/i18n-features';
import { useI18n } from 'vue-i18n';

export const ADJUSTABLE_NAMES_KEY: InjectionKey<AdjustableNames> = Symbol('adjustable-names');

type VueResourceBundle = ResourceBundle<(...args: unknown[]) => string>;

export function useAdjustableNames() {
	const options = inject(ADJUSTABLE_NAMES_KEY);
	if (options === undefined) { throw new Error('Plugin "AdjustableNames" has not been provided'); }

	const { locale, messages, setLocaleMessage } = useI18n();

	const updateMessages = () => {
		const bundle = messages.value as VueResourceBundle;
		const messagesAdjusted = adjustNames({ bundle, options });
		Object.entries(messagesAdjusted)
				.forEach(([locale, translations]) => setLocaleMessage(locale, translations));
	};

	updateMessages();
	watch(locale, updateMessages);
}

export function adjustableNames(app: App, { options = false }: { options?: AdjustableNames | false } = {}) {
	app.provide(ADJUSTABLE_NAMES_KEY, options);
}
