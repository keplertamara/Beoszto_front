import { type StorybookConfig } from '@storybook/vue3-webpack5';

// The 'main.js' is responsible finding stories, declaring addons, and other general setup
// Read mode: https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78
export default {
	// The order of stories determines the sorting of the navigation
	stories: [
		'../src/components/*.stories.(js|ts)',
		'../src/widgets/*.stories.(js|ts)',
		'../src/**/*.stories.(js|ts)',
		'./**/*.stories.(js|ts)',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
	],
	docs: {
		autodocs: true,
	},
	framework: {
		name: '@storybook/vue3-webpack5',
		options: {},
	},
} as StorybookConfig;
