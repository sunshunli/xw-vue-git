// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/index.js';

import VueFetchInstance from "./core/tool/fetch-install";
import Alert from "./core/comps/alert/alert.js";
import CusComp from "./core/comps/comp.js";

Vue.use(VueFetchInstance);
Vue.use(Alert);
Vue.use(CusComp);
Vue.use(Vuex);

router.afterEach(function(to, from, next){
  
});

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
