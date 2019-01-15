import Vue from 'vue';
import Router from 'vue-router';

const H = r=>require.ensure([],()=>r(require("../pages/h.vue")),"H");
const TreeTest = r=>require.ensure([],()=>r(require("../pages/tree.vue")),"TreeTest");

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
    }
];

const _router = new Router({
    routes: routers
});

export default _router;
