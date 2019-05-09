import Vue from 'vue';
import Router from 'vue-router';

const H = r=>require.ensure([],()=>r(require("../pages/h.vue")),"H");
const TreeTest = r=>require.ensure([],()=>r(require("../pages/tree.vue")),"TreeTest");
const FormValidate = r=>require.ensure([],()=>r(require("../pages/form.vue")),"FormValidate");
const Login = r=>require.ensure([],()=>r(require("../pages/login/login.vue")),"Login");

Vue.use(Router);

const routers = [
    {
        path: '/',
        name: 'h',
        component: H
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/tree',
        name: 'tree',
        component: TreeTest
    },
    {
        path: '/form',
        name: 'form',
        component: FormValidate
    }
];

const _router = new Router({
    routes: routers
});

export default _router;
