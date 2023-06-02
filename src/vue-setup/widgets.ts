import { type App } from 'vue';
import * as Widgets from '../widgets';

// Widgets are designed to be reused in the application
// For convenience, they are they globally registered in the app
export function widgets(Vue: App) {
	// Make sure all components that are globally registered have a name
	Object.values(Widgets).forEach(Widget => {
		Vue.component(Widget.name, Widget);
	});
}
