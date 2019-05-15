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

import VueAnalytics from "vue-analytics";
Vue.use(VueAnalytics, {
  id: "UA-131804412-7",
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
});

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
