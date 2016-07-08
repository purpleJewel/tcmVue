'use strict'

export default function(router){
    router.map({
        '/': {			
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        /* 404路由 */
        '*': {
            component: function(resolve){
                // require(['./views/index.vue'],resolve);
            }
        },
        '/sys': {     
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            },
            subRoutes: {
                "/line": {
                    name: 'line',
                    component: function(resolve){
                       require(['./views/_sys/line.vue'],resolve);
                    },
                    auth: true
                },
                "/role": {
                    name: "role",
                    component: function(resolve){
                       require(['./views/_sys/role.vue'],resolve);
                    },
                    auth: true
                },
                "/level": {
                    name: "level",
                    component: function(resolve){
                       require(['./views/_sys/level.vue'],resolve);
                    },
                    auth: true
                },
                "/user": {
                    name: "user",
                    component: function(resolve){
                       require(['./views/_sys/user.vue'],resolve);
                    },
                    auth: true
                },
                "/config": {
                    name: "config",
                    component: function(resolve){
                       require(['./views/_sys/config.vue'],resolve);
                    },
                    auth: true
                }
            }
        },
        '/device': {     
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            },
            subRoutes: {
                "/list": {
                    name: 'list',
                    component: function(resolve){
                       // require(['./views/_sys/list.vue'],resolve);
                    },
                    auth: true
                },
                "/zone": {
                    name: "zone",
                    component: function(resolve){
                       // require(['./views/_sys/zone.vue'],resolve);
                    },
                    auth: true
                },
                "/video": {
                    name: "video",
                    component: function(resolve){
                       // require(['./views/_sys/video.vue'],resolve);
                    },
                    auth: true
                }
            }
        },
        '/store': {
            name: 'store',
            component: function(resolve){
                // require(['./views/index.vue'], resolve);
            },
            auth: true
        },
        '/entry': {
            name: 'entry',
            component: function(resolve){
                require(['./views/_entry/entry.vue'], resolve);
            }
        }
    });
}