import { type Meta, type StoryObj as Story } from '@storybook/vue3';

export default {
	title: 'sass/helpers/layout',
	argTypes: { noInputs: { control: null, name: 'No inputs' } },
	parameters: {
		controls: { disable: true },
	},
} as Meta;

export const LayoutGrid: Story = {
	render: () => ({
		template: `
			<div class="has-layout-grid">
				<sb-placeholder name="Content block" />
				<sb-placeholder name="Content block" />
				<sb-placeholder name="Content block" />
			</div>
		`,
	}),
};

/* scaffolding-disable unless keepExamples */
export const FullsizeBlock: Story = {
	render: () => ({
		template: `
			<ds-panel style="width: 100%;">
				<sb-placeholder name="Fullsize block" class="is-fullsize-block-top" />
				<sb-placeholder name="Regular block" />
				<sb-placeholder name="Regular block" />
				<sb-placeholder name="Fullsize block" class="is-fullsize-block-bottom" />
			</ds-panel>
		`,
	}),
	parameters: { docs: { description: {
		story: 'Use negative margins to get out of the paddings imposed by the parent.',
	} } },
};
/* scaffolding-enable */
