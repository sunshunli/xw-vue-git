import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import HelloWorld from '../components/HelloWorld.vue';

import AuthHOC from "../components/authHOC/authHoc.js";
import Input from "../components/input.vue"

import FS from "../components/testfs/test.vue";

Vue.use(Router);
Vue.use(Vuex);

export default new Router({
  routes: [
    {
      
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login1',
      name: 'login1',
      component: AdminLogin
    },
    {
      path: '/', //this that,aa
      name: 'fs',
      component: FS
    },
    {
      path: '/input',
      name: 'Input',
      component: AuthHOC(Input)
    }
  ]
})
