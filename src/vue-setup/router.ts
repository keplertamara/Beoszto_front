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
	{
		// Prefer navigating by name over path
		name: 'performances', path: '/performances',
		// Forward all query params as props. This decouples the component from URL awareness.
		props: ({ query }) => query,
		// Importing components asynchronously improves bundle size
		// The magic comment is optional, but produces more readable file names
		component: () => import(/* webpackChunkName: "the-app" */ '../components/Preformances.vue'),
	},
	{
		// Prefer navigating by name over path
		name: 'technicians', path: '/technicians',
		// Forward all query params as props. This decouples the component from URL awareness.
		props: ({ query }) => query,
		// Importing components asynchronously improves bundle size
		// The magic comment is optional, but produces more readable file names
		component: () => import(/* webpackChunkName: "the-app" */ '../components/Technicians.vue'),
	},
	{
		// Prefer navigating by name over path
		name: 'schedule', path: '/schedule',
		// Forward all query params as props. This decouples the component from URL awareness.
		props: ({ query }) => query,
		// Importing components asynchronously improves bundle size
		// The magic comment is optional, but produces more readable file names
		component: () => import(/* webpackChunkName: "the-app" */ '../components/ScheduleCalc.vue'),
	},
	{
		// Prefer navigating by name over path
		name: 'upcoming', path: '/upcoming',
		// Forward all query params as props. This decouples the component from URL awareness.
		props: ({ query }) => query,
		// Importing components asynchronously improves bundle size
		// The magic comment is optional, but produces more readable file names
		component: () => import(/* webpackChunkName: "the-app" */ '../components/UpcomingPerformances.vue'),
	},
	{
		// Prefer navigating by name over path
		name: 'performanceInput', path: '/performance_input',
		// Forward all query params as props. This decouples the component from URL awareness.
		props: ({ query }) => query,
		// Importing components asynchronously improves bundle size
		// The magic comment is optional, but produces more readable file names
		component: () => import(/* webpackChunkName: "the-app" */ '../components/PerformanceInput.vue'),
	},
	{
		// Prefer navigating by name over path
		name: 'technicianInput', path: '/technician_input',
		// Forward all query params as props. This decouples the component from URL awareness.
		props: ({ query }) => query,
		// Importing components asynchronously improves bundle size
		// The magic comment is optional, but produces more readable file names
		component: () => import(/* webpackChunkName: "the-app" */ '../components/TechnicianInput.vue'),
	},
];

export const router = createRouter({
	routes,
	history: createWebHistory(process.env.PUBLIC_PATH),
});
