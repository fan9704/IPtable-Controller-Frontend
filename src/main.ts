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

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

const vue = createApp(App);

vue.use(router);
vue.use(store);
vue.use(vuetify);
// vue.use(createVuestic());
vue.use(VueSweetalert2);
// @ts-ignore
vue.use(AOS.init());

// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));
