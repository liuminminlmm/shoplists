import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from '../views/search'
import Index from '../views/index';
import Login from '../views/login';
import Home from '../views/home/home.vue';
import Classify from '../views/classify/classify.vue';
import Detail from '../views/detail/detail.vue';
import Shopcart from '../views/shopcart/shopcart.vue';
import Mine from '../views/mine/mine.vue';
import Register from '../views/register/register.vue';
import Order from '../views/order';
import Obligation from '../views/obligation/obligation.vue';
import Overhang from '../views/overhang/overhang.vue';
import Wait from '../views/wait/wait.vue';
import Aftersale from '../views/aftersale/aftersale.vue';
import All from '../views/all/all.vue';
import Payment from '../views/payment/payment.vue';
Vue.use(VueRouter);
import { getCookie } from '../utils/getcookie.js';
import Addaddr from '../views/addaddr/addaddr.vue';
import Additem from '../views/addaddr/additem.vue';
import Setup from '../views/mine/setup/setup.vue';

let router = new VueRouter({
    mode: 'history',
    routes: [{
        redirect: '/index',
        path: '/'
    }, {
        name: 'search',
        path: '/search',
        component: Search
    }, {
        name: 'index',
        path: '/index',
        component: Index,
        children: [{
            name: 'home',
            path: 'home',
            component: Home
        }, {
            name: 'classify',
            path: 'classify',
            component: Classify
        }, {
            name: 'shopcart',
            path: 'shopcart',
            component: Shopcart
        }, {
            name: 'mine',
            path: 'mine',
            component: Mine
        }]
    }, {
        name: 'detail',
        path: '/detail',
        component: Detail
    }, {
        name: 'login',
        path: '/login',
        component: Login
    }, {
        name: 'register',
        path: '/register',
        component: Register
    }, {
        name: 'order',
        path: '/order',
        component: Order
    }, {
        name: 'all',
        path: '/all',
        component: All
    }, {
        name: 'obligation',
        path: '/obligation',
        component: Obligation
    }, {
        name: 'overhang',
        path: '/overhang',
        component: Overhang
    }, {
        name: 'wait',
        path: '/wait',
        component: Wait
    }, {
        name: 'aftersale',
        path: '/aftersale',
        component: Aftersale
    }, {
        name: 'payment',
        path: '/payment',
        component: Payment
    }, {
        name: 'additem',
        path: '/additem',
        component: Additem
    }, {
        name: 'addaddr',
        path: '/addaddr',
        component: Addaddr
    },{
        name: 'setup',
        path: '/setup',
        component: Setup
    }],
    activeName: ['active']
})

//导航守卫拦截 to是数据 from是地址栏参数 next
router.beforeEach((to, from, next) => {
    // console.log(to);
    if (to.name == 'mine' || to.name == 'shopcart') {
        let token = getCookie('token');
        if (!token) {
            next({
                name: 'login',
                //query传参是对象
                query: { from: to.name }
            })
        } else {
            next();
        }
    } else {
        next()
    }
})
export default router;