import { type Meta, type StoryObj } from '@storybook/vue3';
import TdPage from './td-page.vue';

export default {
	title: 'widgets/td-page',
	component: TdPage,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof TdPage>;

// Declare the type of a story once for simpler reuse
type Story = StoryObj<typeof TdPage>;

export const Base: Story = {
	render: () => ({
		template: `
			<td-page>
				<template #header>
					<sb-placeholder name="Header" />
				</template>
				<template #side>
					<sb-placeholder name="Side" />
				</template>
				<template #default>
					<sb-placeholder name="Default" />
				</template>
			</td-page>
		`,
	}),
};

export const AlertAndStatus: Story = {
	render: () => ({
		template: `
			<td-page>
				<template #alert>
					<sb-placeholder name="Alert is for error and warning notifications" variant="danger" />
				</template>
				<template #status>
					<sb-placeholder name="Status is for other notifications" variant="primary" />
				</template>
				<template #header>
					<sb-placeholder name="Header" />
				</template>
				<template #side>
					<sb-placeholder name="Side" />
				</template>
				<template #default>
					<sb-placeholder name="Default A" />
					<sb-placeholder name="Default B" />
					<sb-placeholder name="Default C" />
				</template>
			</td-page>
		`,
	}),
};
