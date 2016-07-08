'use strict'

import Vue from 'vue';
import VueRouter from 'vue-router';
import filters from './filters';
import routerConfig from './routers';
import navHeader from './components/header.vue';
import global from './global.js';

Vue.use(VueRouter);

$.ajaxSettings.crossDomain = true;

//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

//实例化VueRouter
let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

//登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((transition) => {
   /* if (transition.to.auth) {
        if (localStorage.userId) {
            transition.next();
        } else {
            var redirect = encodeURIComponent(transition.to.path);
            transition.redirect('/entry');
        }
    } else {
        transition.next();
    }*/
        transition.next();
});

router.afterEach((transition) => {
	$('body').removeClass().addClass(transition.to.name);
});

let App = Vue.extend({
	components: {
		navHeader
	}
});
routerConfig(router);


router.start(App, "#app");

window.router = router;