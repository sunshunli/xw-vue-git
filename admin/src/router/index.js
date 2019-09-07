import Vue from 'vue';
import Router from 'vue-router';

const H = r=>require.ensure([],()=>r(require("../pages/h.vue")),"H");
const TreeTest = r=>require.ensure([],()=>r(require("../pages/tree.vue")),"TreeTest");
const FormValidate = r=>require.ensure([],()=>r(require("../pages/form.vue")),"FormValidate");
const Login = r=>require.ensure([],()=>r(require("../pages/login/login.vue")),"Login");
const TestPage = r=>require.ensure([],()=>r(require("../pages/test.vue")),"TestPage");

const DemoPage = r=>require.ensure([],()=>r(require("../pages/demoPage.vue")),"DemoPage");
const DemoPage1 = r=>require.ensure([],()=>r(require("../pages/demoPage1.vue")),"DemoPage1");

const UsePage = r=> require.ensure([],()=>(require("../pages/usePage.vue")),"UsePage");
const UsePageAdd = r=> require.ensure([],()=>(require("../pages/usePageAdd.vue")),"UsePageAdd");

const scrollPage = r=>require.ensure([],()=>r(require("../pages/scrollPage.vue")),"ScrollPage");
const buttonPage = r=>require.ensure([],()=>r(require("../pages/buttonPage.vue")),"ButtonPage");

const newTestPage = r=>require.ensure([],()=>r(require("../pages/newTestPage.vue")),"newTestPage");
const newTestPageAdd = r=>require.ensure([],()=>r(require("../pages/newTestPageAdd.vue")),"newTestPageAdd");

Vue.use(Router);

const routers = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/main',
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
        path: '/test',
        name: 'test',
        component: TestPage
    },{
        path:'/demopage',
        name:'demopage',
        component:DemoPage
    },{
        path:'/DemoPage1',
        name:'DemoPage1',
        component:DemoPage1
    },{
        path:'/usePage',
        name:'UsePage',
        component:UsePage
    },{
        path:'/add',
        name:'add',
        component:UsePageAdd
    },{
        path:'/scrollPage',
        name:'scrollPage',
        component:scrollPage
    },{
        path:'/button',
        name:'button',
        component:buttonPage
    },
    {
        path:'/newTestPage',
        name:'newTestPage',
        component:newTestPage
    },{
        path:'/newTestPageAdd',
        name:'newTestPageAdd',
        component:newTestPageAdd
    }
];

const _router = new Router({
    routes: routers
});

export default _router;
