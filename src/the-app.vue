<template>
	<td-page>
		<!-- scaffolding-disable unless keepExamples -->
		<template v-if="messageInput" #alert>
			<ds-notification
				header="Alert"
				variant="danger"
				prominent
				@close="messageInput = ''"
			>
				{{ messageInput }}
			</ds-notification>
		</template>

		<template #status>
			<ds-notification v-if="infoVisible" header="Use the role attribute" @close="infoVisible = false">
				Notifications need a parent with the role set to status / alert all the time.
			</ds-notification>
		</template>

		<template #header>
			<h1 class="title">Example translation: "{{ title }}"</h1>
		</template>

		<template #side>
			<ds-panel header="Did you know?">
				<p>
					The client code is aware that it's being served from the <strong>{{ publicPath }}</strong> public path.<br>
					This path is only set in a single place: <strong>package.json -> config.default_public_path</strong>
				</p>
				<p>
					The scaffolding already comes with a <strong>renovate.json</strong>.
					You still need to add your repo the central list if you want RenovateBot to update your dependencies.
				</p>
			</ds-panel>
		</template>

		<template #default>
			<ds-panel header="I18N">
				<ds-notification
					class="is-fullsize-block-top"
					header="Todo"
					variant="warning"
					hide-close-button
				>
					Using @topdesk/translations__td-asset-management is only an example.
					Please swap it out with your own translations.
				</ds-notification>
				<div>It's short for internationalization and localization.</div>
				<em>
					Edit the <strong>fetchMockLocalization()</strong> in the <strong>main.ts</strong>
					to play with the "Adjustable names" TOPdesk feature. Alternatively, replace the mock with a real API call.
				</em>
				<ds-button data-testid="toggle-language" @click="toggleLanguage">Toggle title translations</ds-button>
			</ds-panel>

			<ds-panel header="Routing">
				Not only can the router navigate between pages but it can also keep some of the app state in the URL.
				<ds-input v-model="messageInput" label="Alert as a query param" data-testid="message-input" />
			</ds-panel>

			<ds-panel header="State management">
				<div>Use <strong>local state</strong> for details only relevant for a single component.</div>
				<div>Info is {{ infoVisible ? 'visible' : 'hidden' }}.</div>
				<ds-button data-testid="show-info" @click="showInfo">
					Show notifications
				</ds-button>

				<div>Use the <strong>global store</strong> for application-wide concerns.</div>
				<div data-testid="click-count-message">
					You clicked the Design System <strong>{{ counter }} times</strong>.
				</div>
				<ds-button data-testid="increment-counter" variant="primary" @click="incrementCounter">
					<ds-icon :icon="dsFiretruck" />
					<span>Click me</span>
				</ds-button>

				<the-message data-testid="theMessage" />
			</ds-panel>
		</template>
		<!-- scaffolding-enable -->
	</td-page>
</template>

<script lang="ts">
import { defineComponent, ref, unref, type MaybeRef } from 'vue';
/* scaffolding-disable unless keepExamples */
import { computed, onMounted, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore, updateLanguage, useAdjustableNames } from 'src/vue-setup';
import { dsFiretruck } from '@topdesk/icons';
import TheMessage from './components/the-message.vue';

/* scaffolding-enable */
export default defineComponent({
	/* scaffolding-disable unless keepExamples */
	components: { TheMessage },
	props: {
		message: { type: String, default: '' },
	},
	/* scaffolding-enable */
	setup(props) {
		// Initialize the Adjustable Names feature that allows customizing some of the common terminology of TOPdesk
		useAdjustableNames();

		const { title } = useDocumentTranslations({ titleKey: 'persongroup.assigned.to.asset' });

		/* scaffolding-disable unless keepExamples */
		const { locale } = useI18n();
		const toggleLanguage = () => updateLanguage(locale.value === 'en-GB' ? 'pt' : 'en-GB');

		// The Composition API allows breaking down behavior based on use cases
		// Note that each of the implementations could be pulled out to separate files
		const { infoVisible, showInfo } = useLocalRefExample();
		const { counter, incrementCounter, message, dismissMessage } = usePiniaExample();

		const { messageInput } = useRouterExample(props);
		return {
			infoVisible, showInfo,
			alertMessage: message, dismissMessage,
			title, toggleLanguage,
			counter, incrementCounter,
			messageInput,
			dsFiretruck, // It's simpler to bypass the library.add and use the icon definition directly
			focus, publicPath: process.env.PUBLIC_PATH,
		};
	},
	/* scaffolding-enable */
});

// This is a "composable". You can read more about them in the Vue docs.
function useDocumentTranslations({ titleKey }: { titleKey: MaybeRef<string> }) {
	const { t, locale } = useI18n();

	const title = computed(() => t(unref(titleKey)));

	onMounted(() => {
		// For accessibility reasons initialize document title and HTML lang
		watchEffect(() => { document.documentElement.setAttribute('lang', locale.value); });
		// The title should mirror <h1> element (not necessarily to the letter)
		watchEffect(() => { document.title = title.value; });
	});

	return { title, locale };
}

/* scaffolding-disable unless keepExamples */

function useLocalRefExample() {
	const infoVisible = ref(false);
	const showInfo = () => { infoVisible.value = true; };

	return { infoVisible, showInfo };
}

function usePiniaExample() {
	const store = useStore();

	const counter = computed(() => store.counter);
	const message = computed(() => store.message);
	const { dismissMessage, incrementCounter } = store;

	return { counter, incrementCounter, message, dismissMessage };
}

function useRouterExample(props: { message: string }) {
	const { push } = useRouter();

	const messageInput = computed({
		get: () => props.message,
		set: message => push({ query: message ? { message } : undefined }),
	});

	return { messageInput };
}
/* scaffolding-enable */
// Notice how "container components" don't have their own <style> bocks.
// Instead, they offload layout concerns to "presentational components".
</script>
