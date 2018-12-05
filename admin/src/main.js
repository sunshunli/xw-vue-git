// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/index.js';

import VueCoreInstance from "./core/tool/vue-install";

import Alert from "./core/comps/alert/alert";

Vue.use(Vuex);
Vue.use(VueCoreInstance);
Vue.use(Alert);

router.afterEach(function(to, from, next){

});

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
