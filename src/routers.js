'use strict'

export default function(router){
    router.map({
        '/':{				
            name:'home',
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
        '/sys':{               
            component: function(resolve){
                require(['./views/line.vue'],resolve);
            },
            subRoutes: {
                "/line": {
                    name: "line",
                    component : function(resolve){
                       require(['./views/line.vue'],resolve);
                    }
                },
                "/role": {
                    name: "role",
                    component : function(resolve){
                       require(['./views/role.vue'],resolve);
                    }
                },
                "/level": {
                    name: "level",
                    component : function(resolve){
                       require(['./views/level.vue'],resolve);
                    }
                },
                "/user": {
                    name: "user",
                    component : function(resolve){
                       require(['./views/user.vue'],resolve);
                    }
                },
                "/config": {
                    name: "config",
                    component : function(resolve){
                       require(['./views/config.vue'],resolve);
                    }
                }
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