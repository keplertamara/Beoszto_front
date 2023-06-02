// The 'preview.js' is responsible to setting up how stories get rendered
// Import the same styles the app normally uses
import 'src/style/main.scss';
// Undo the unwanted effects Bulma has on the code blocks of Storybook
import './fix-prismjs-js.css';

// Make sure vue is set up the same way as usual
import { type Parameters, setup } from '@storybook/vue3';
import { i18n, adjustableNames, widgets } from 'src/vue-setup';
import * as StorybookComponents from './components';

setup(app => {
	app.use(i18n).use(adjustableNames).use(widgets);
	Object.values(StorybookComponents).forEach(Component => {
		app.component(Component.name, Component);
	});
});

export const parameters = {
	// For syntax highlight, the HTML language is the closest match the the Vue template
	docs: { source: { language: 'html' } },
	viewport: {
		viewports: {
			// These values should be in sync with the Design System Storybook
			small: { name: 'Small - Mobile', styles: { width: '320px', height: '600px' } },
			medium: { name: 'Medium - Tablet', styles: { width: '600px', height: '800px' } },
			large: { name: 'Large - Laptop', styles: { width: '905px', height: '768px' } },
			xl: { name: 'XL - Desktop', styles: { width: '1366px', height: '768px' } },
		},
	},
} as Parameters;
