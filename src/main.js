// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';

import VueCoreInstance from "./core/tool/vue-install";

import alert from "./core/comps/alert/alert.js";
import LeButton from "./core/comps/button/button.vue";
import LeCheckboxList from "./core/comps/checkbox/checkboxList.vue";
import VInput from "./core/comps/input/vInput.vue";
import CInput from "./core/comps/input/cInput.vue";
import LocalSelect from "./core/comps/select/localSelect.vue";
import TableList from "./core/comps/table/tableList.vue";
import FileUpload from "./core/comps/upload/upload.vue";

Vue.use(VueCoreInstance);
Vue.use(alert);
Vue.use(LeButton);
Vue.use(LeCheckboxList);
Vue.use(VInput);
Vue.use(CInput);
Vue.use(LocalSelect);
Vue.use(TableList);
Vue.use(FileUpload);

Vue.config.productionTip = false;

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
