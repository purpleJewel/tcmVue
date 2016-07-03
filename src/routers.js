'use strict'

export default function(router){
    router.map({
        '/':{				//首页
            name:'home',
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        /* 404路由 */
        '*': {
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        '/cnodevue':{               //首页
            name:'home',
            component: function(resolve){
                require(['./views/index.vue'],resolve);
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