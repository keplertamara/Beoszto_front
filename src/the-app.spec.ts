import { shallowMount } from '@vue/test-utils';
import { waitFor } from '@testing-library/vue';
import { routerKey } from 'vue-router';
import { byTestId, setupOptions } from 'test/utils';
import { updateLanguage } from 'src/vue-setup'; // scaffolding-disable-line unless keepExamples
import App from './the-app.vue';

test('displays in English by default', async () => {
	setup();
	await waitFor(() => expect(document.documentElement.lang).toBe('en-GB'));
});

/* scaffolding-disable unless keepExamples */
test('toggles language', async () => {
	await updateLanguage('pt');
	const { wrapper } = setup();
	await wrapper.getComponent(byTestId('toggle-language')).trigger('click');
	await waitFor(() => expect(document.documentElement.lang).toBe('pt'));
});

test('pushes message input value to URL', async () => {
	const { wrapper, router } = setup();
	await wrapper.getComponent(byTestId('message-input')).setValue('test-message');
	expect(router.push).toHaveBeenCalledWith({ query: { message: 'test-message' } });
});
/* scaffolding-enable */
function setup() {
	const router = { push: jest.fn() };
	const provide = { [routerKey as symbol]: router };
	const wrapper = shallowMount(App, setupOptions({ provide }));
	return { wrapper, vm: wrapper.vm, router };
}

