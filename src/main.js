'use strict'

import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConfig from './routers';
import store from './vuex/store.js';
import filters from './filters';
import {globalBus, eventBus} from './libs/eventemitter.js';
import navHeader from './components/header.vue';
import global from './global.js';

//定义全局事件对象
window.globalBus = globalBus; //全局公用事件
window.eventBus = eventBus;   //单页面内部事件

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
    if (transition.to.name === "entry" && localStorage.userId) 
        transition.redirect('/');
    if (transition.to.auth) {
        if (localStorage.userId) {
            transition.next();
        } else {
            transition.redirect('/entry');
        }
    } else {
        transition.next();
    }
});

router.afterEach((transition) => {
    //路由跳转时，清空单页面注册事件
    eventBus.removeAllListeners();
    //进入entry界面之前，取消动画效果
    if (transition.to.name === 'entry')
        $('#body').removeClass('fade-transition');
	$('body').removeClass().addClass(transition.to.name);
});

//全局绑定a标签Enter键触发其click事件
var $document = $(document);
$document.off();
$document.on('keyup', function(event) {
    event.preventDefault();
    if (event.key == 'Enter')
        $('a.Enter').click();
});

let App = Vue.extend({
    store,
	components: {
		navHeader
	}
});
routerConfig(router);

router.start(App, "#app");

window.router = router;