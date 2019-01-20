import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home/Home.vue')
const Index = () => import('./views/Index/Index.vue')
const Login = () => import('./views/Login/Login.vue');
const test = () => import('./components/common/SearchResult');


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
            // component: test
            // component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/index',
            component: Index,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
