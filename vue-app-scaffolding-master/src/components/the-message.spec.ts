/* scaffolding-delete-file unless keepExamples */
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { useStore } from 'src/vue-setup';
import { byTestId, setupOptions } from 'test/utils';
import TheMessage from './the-message.vue';

test('does not show popup with a falsy message', async () => {
	const { vm } = await setup({ message: '' });
	expect(vm.$el.opened).toBe(false);
});

test('shows popup when message turns to truthy', async () => {
	const { vm } = await setup({ message: 'Test message' });
	expect(vm.$el.opened).toBe(true);
});

test('shows message in popup', async () => {
	const { wrapper } = await setup({ message: 'Test message' });
	expect(wrapper.get(byTestId('modal-message')).text()).toBe('Test message');
});

// The setup function as a pattern is responsible for minimizing boilerplate in test / spec files
async function setup({ message }: { message: string }) {
	const wrapper = mount(TheMessage, setupOptions());

	const store = useStore();
	store.message = message;

	await nextTick();

	return { wrapper, vm: wrapper.vm };
}

