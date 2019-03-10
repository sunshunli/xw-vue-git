import Vue from 'vue';
import Router from 'vue-router';

const H = r=>require.ensure([],()=>r(require("../pages/h.vue")),"H");
const TreeTest = r=>require.ensure([],()=>r(require("../pages/tree.vue")),"TreeTest");
const FormValidate = r=>require.ensure([],()=>r(require("../pages/form.vue")),"FormValidate");
const SINPUT = r=>require.ensure([],()=>r(require("../pages/input.vue")),"SINPUT");

Vue.use(Router);

const routers = [
    {
        path: '/',
        name: 'h',
        component: H
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
    },
    {
        path: '/input',
        name: 'input',
        component: SINPUT
    }
];

const _router = new Router({
    routes: routers
});

export default _router;
