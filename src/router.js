import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home/Home.vue')
const Index = () => import('./views/Index/Index.vue')
const Login = () => import('./views/Login/Login.vue');
const Shop = () => import('./views/Shop/Shop.vue');
const dev = () => import('./views/User/User.vue');
const Test = () => import('./components/Test');


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            // component: Home
            component: dev
            // component: Shop
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
            path: '/shop',
            component: Shop,
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
