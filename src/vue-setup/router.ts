import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		// Prefer navigating by name over path
		name: 'home', path: '/',
		// Forward all query params as props. This decouples the component from URL awareness.
		props: ({ query }) => query,
		// Importing components asynchronously improves bundle size
		// The magic comment is optional, but produces more readable file names
		component: () => import(/* webpackChunkName: "the-app" */ '../the-app.vue'),
	},
];

export const router = createRouter({
	routes,
	history: createWebHistory(process.env.PUBLIC_PATH),
});
