// "Widgets" are just vue files that
// - are independent of the application shared state
// - are globally available in your app
// - are meant to be reusable
export {
	DsButton,
	DsIcon,
	/* scaffolding-disable unless keepExamples */
	DsInput,
	DsModal,
	DsModalContent,
	DsNotification,
	DsPanel,
	/* scaffolding-enable */
} from '@topdesk/components-vue';
export { default as TdPage } from './td-page.vue';
