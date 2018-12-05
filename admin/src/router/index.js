import Vue from 'vue';
import Router from 'vue-router';

const H = r=>require.ensure([],()=>r(require("../pages/h.vue")),"H");

Vue.use(Router);

const routers = [
    {
        path: '/',
        name: 'h',
        component: H
    }
];

const _router = new Router({
    routes: routers
});

export default _router;
