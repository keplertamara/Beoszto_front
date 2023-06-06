import './style/main.scss';
import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import { router } from './vue-setup';
import App from './the-app.vue';
import { createPinia } from 'pinia';

// Start fetching any non-default translations right after
const pinia = createPinia();

/* eslint-disable-next-line no-console */
console.log("You won't see this message repeating when using HMR and editing vue files.");

createApp(RouterView)
  .use(pinia)
  .use(router)
  .component('router-view', RouterView)
  .mount(document.body);