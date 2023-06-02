import { computed, ref } from 'vue'; /* eslint-disable-line @typescript-eslint/no-unused-vars */
import { type Snippet } from 'src/domain/snippet'; // scaffolding-disable-line unless keepExamples
import { useApi } from 'src/vue-setup';
import { type Api } from 'src/api';

export function Store({ api = useApi() } : { api?: Api } = {}) { /* eslint-disable-line @typescript-eslint/no-unused-vars */
	/* scaffolding-disable unless keepExamples */
	// State
	const counter = ref(0);
	const message = ref<string | null>(null);
	const snippets = ref<Snippet[]>([]);
	const snippetsJson = ref('');

	// Getters
	const isTired = computed(() => counter.value >= 5);

	// Actions
	const showMessage = (newMessage: string) => {
		message.value = newMessage;
	};

	const dismissMessage = () => {
		message.value = null;
	};

	const incrementCounter = async () => {
		counter.value++;

		if (isTired.value) {
			await loadSnippets();
		}
	};

	const loadSnippets = async () => {
		const result = await api.getSnippets();
		snippets.value = result.snippets;
		snippetsJson.value = result.json;
		showMessage('Paste any of the following into your .vscode/scaffolding.code-snippets file.');
	};

	// Return all public APIs
	/* scaffolding-enable */
	return {
		/* scaffolding-disable unless keepExamples */
		counter, message,
		snippets, snippetsJson, loadSnippets,
		isTired,
		showMessage, dismissMessage, incrementCounter,
		/* scaffolding-enable */
	};
}
