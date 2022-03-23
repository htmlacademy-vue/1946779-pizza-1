import Vue from "vue";
import App from "./App.vue";
import '@/plugins/ui';
import router from '@/router/router';
import store from '@/store';
import '@/plugins/vuePlugins';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
