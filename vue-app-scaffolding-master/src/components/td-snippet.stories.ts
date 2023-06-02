/* scaffolding-delete-file unless keepExamples */
import { type Meta, type StoryObj } from '@storybook/vue3';
import TdSnippet from './td-snippet.vue';

export default {
	title: 'components/td-snippet',
	component: TdSnippet,
	args: {
		body: 'This is the body',
		description: 'This is the description of the snippet',
		prefix: 'sb-example',
		scopes: [],
		open: true,
	},
	argTypes: {
		onCopy: { action: 'copy' },
	},
} as Meta<typeof TdSnippet>;

// Declare the type of a story once for simpler reuse
type Story = StoryObj<typeof TdSnippet>;

export const Base: Story = {};
export const ScopeCode: Story = { args: {
	scopes: ['typescript'],
	body: 'function peek<T>(thing: T) { console.log(thing); return thing; }',
} };
export const ScopeSass: Story = { args: {
	scopes: ['scss'],
	body: "@use '@topdesk/components-vue/main.scss';",
} };
export const WithMultilineBody: Story = { args: {
	scopes: ['javascript'],
	body: [
		'function now() {',
		'	return new Date();',
		'}',
	].join('\n'),
} };

export const WithScrolling: Story = { parameters: { viewport: { defaultViewport: 'large' } }, args: {
	scopes: ['javascript'],
	body: [
		'function longText() {',
		"	return 'this is a really really really really really really really really really really really really long text'",
		'}',
	].join('\n'),
} };
