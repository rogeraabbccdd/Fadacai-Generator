import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import VueGitHubButtons from "vue-github-buttons";
Vue.use(VueGitHubButtons, { useCache: true });

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStop,
  faLink,
  faDownload,
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
library.add(
  faPlay,
  faStop,
  faLink,
  faDownload,
  faTrashAlt,
  faFacebookF,
  faChevronUp,
  faChevronDown
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import VueAnalytics from "vue-analytics";
Vue.use(VueAnalytics, {
  id: "UA-131804412-7",
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
});

import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
