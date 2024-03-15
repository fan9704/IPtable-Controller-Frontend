/**
 * Vue3 Main script
 */

// Load vue core
import store from '@/store';
import { createApp } from 'vue';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";


const vue = createApp(App);

vue.use(router);
vue.use(store);
vue.use(vuetify);
// vue.use(createVuestic());

// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));
