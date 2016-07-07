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
                    }
                },
                "/role": {
                    name: "role",
                    component: function(resolve){
                       require(['./views/_sys/role.vue'],resolve);
                    }
                },
                "/level": {
                    name: "level",
                    component: function(resolve){
                       require(['./views/_sys/level.vue'],resolve);
                    }
                },
                "/user": {
                    name: "user",
                    component: function(resolve){
                       require(['./views/_sys/user.vue'],resolve);
                    }
                },
                "/config": {
                    name: "config",
                    component: function(resolve){
                       require(['./views/_sys/config.vue'],resolve);
                    }
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
                    }
                },
                "/zone": {
                    name: "zone",
                    component: function(resolve){
                       // require(['./views/_sys/zone.vue'],resolve);
                    }
                },
                "/video": {
                    name: "video",
                    component: function(resolve){
                       // require(['./views/_sys/video.vue'],resolve);
                    }
                }
            }
        },
        '/store': {
            name: 'store',
            component: function(resolve){
                require(['./views/index.vue']);
            }
        }
    })
    //登录中间验证，页面需要登录而没有登录的情况直接跳转登录
    router.beforeEach((transition) => {

        /*if (transition.to.auth) {
            if (localStorage.userId) {
                transition.next();
            } else {
                var redirect = encodeURIComponent(transition.to.path);
                transition.redirect('/login?redirect=' + redirect);
            }
        } else {
            transition.next();
        }*/
        transition.next();
    });
}