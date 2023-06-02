/* scaffolding-delete-file unless keepExamples */
import { mount } from '@vue/test-utils';
import { Api } from 'src/api';
// It's encouraged to extract test values to fixtures
// to prevent information about them getting scattered
// all over the codebase in a fragmented form.
import { SNIPPETS_API_PATH, SnippetsResponse } from 'test/fixtures';
import { AxiosMock, byTestId, setupOptions } from 'test/utils';
import { router } from 'src/vue-setup';
import App from 'src/the-app.vue';

const RESPONSES = {
	[SNIPPETS_API_PATH]: SnippetsResponse(),
};

test('is testable with only the network mocked out', async () => {
	const { wrapper } = await mountWith({ get: RESPONSES });
	const incrementCounterButton = wrapper.get(byTestId('increment-counter'));
	await incrementCounterButton.trigger('click');
	await incrementCounterButton.trigger('click');
	expect(wrapper.get(byTestId('click-count-message')).text()).toEqual(expect.stringContaining('2 times'));
	await incrementCounterButton.trigger('click');
	await incrementCounterButton.trigger('click');
	await incrementCounterButton.trigger('click');

	expect(wrapper.get(byTestId('modal-message')).text()).toEqual(expect.stringContaining('code-snippets'));
});

async function mountWith(network: { get: { [url: string]: Record<string, unknown> } }) {
	// Setup the prod router following the Vue Testing Handbook's setup
	router.push('/');
	await router.isReady();
	// Setup the network
	const axios = AxiosMock();
	axios.get.mockImplementation(async url => ({ data: network.get[url] || RejectWith404() }));
	const api = Api(axios);
	// Mount the app
	const wrapper = mount(App, setupOptions({ api, router }));
	return { wrapper, axios };
}

async function RejectWith404() {
	throw new Error("That's a 404 for you");
}
