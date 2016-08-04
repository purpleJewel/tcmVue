'use strict'

export default function(router){
    router.map({
        '/': {	
            name: 'home',		
            component: resolve => {
                require(['./views/index.vue'],resolve);
            }
        },
        /* 404路由 */
        '*': {
            component: resolve => {
                // require(['./views/index.vue'],resolve);
            }
        },
        "/sys/line": {
            name: 'line',
            component: resolve => {
               require(['./views/_sys/line.vue'],resolve);
            },
            auth: true
        },
        "/sys/config": {
            name: "config",
            component: resolve => {
               require(['./views/_sys/config.vue'],resolve);
            },
            auth: true
        },
        "/user/role": {
            name: "role",
            component: resolve => {
               require(['./views/_user/role.vue'],resolve);
            },
            auth: true
        },
        "/user/level": {
            name: "level",
            component: resolve => {
               require(['./views/_user/level.vue'],resolve);
            },
            auth: true
        },
        "/user/user": {
            name: "user",
            component: resolve => {
               require(['./views/_user/user.vue'],resolve);
            },
            auth: true
        },
        "/device/list": {
            name: 'list',
            component: resolve => {
               require(['./views/_device/list.vue'],resolve);
            },
            auth: true
        },
        "/device/zone": {
            name: "zone",
            component: resolve => {
               require(['./views/_device/zone.vue'],resolve);
            },
            auth: true
        },
        "/device/video": {
            name: "video",
            component: resolve => {
               require(['./views/_device/video.vue'],resolve);
            },
            auth: true
        },
        '/store': {
            name: 'store',
            component: resolve => {
                require(['./views/_store/store.vue'], resolve);
            },
            auth: true
        },
        '/entry': {
            name: 'entry',
            component: resolve => {
                require(['./views/_entry/entry.vue'], resolve);
            }
        }
    });
}