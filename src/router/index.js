/**
 * Created by Zachary93 18/06/05.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router-config'
import store from '../store'
import * as types from '../store/mutation-types'

Vue.use(VueRouter)

// 页面刷新时，重新赋值
const localStorageToken = window.localStorage.getItem('XG_TOKEN'),
    localStorageUser = window.localStorage.getItem('XG_USER'),
    localStorageUserName  = window.localStorage.getItem('XG_USERNAME'),

    hasBottomNavPage = ['home', 'authList', 'mine'];


if (localStorageToken) {
    store.commit(types.SUCCESS_LOGIN, { token: localStorageToken });
};
if (localStorageUser) {
    store.commit(types.RECEIVE_USERINFO, JSON.parse(localStorageUser));
};
if(localStorageUserName){
    store.commit(types.UPDATE_USERNAME, JSON.parse(localStorageUserName));
};

const router = new VueRouter({
    // mode: 'history',
    routes: routerConfig,
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return { x: 0, y: 0 }
    //   }
    // }
});

const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

router.beforeEach((to, from, next) => {

    // 根据页面名称确定是否需要隐藏底部导航
    if (hasBottomNavPage.indexOf(to.name) != -1) {
        store.dispatch('showNav');
    } else {
        store.dispatch('hideNav');
    };

    if (hasBottomNavPage.indexOf(to.name) == -1) {
        const toIndex = history.getItem(to.path)
        const fromIndex = history.getItem(from.path)

        if (toIndex) {
            if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
                store.commit(types.UPDATE_DIRECTION, 'forward')
            } else {
                store.commit(types.UPDATE_DIRECTION, 'reverse')
            }
        } else {
            ++historyCount
            history.setItem('count', historyCount)
            to.path !== '/' && history.setItem(to.path, historyCount)
            store.commit(types.UPDATE_DIRECTION, 'forward')
        }
    };
    
    if (to.name != 'home') {
        document.title = to.meta.title || 'Zachary';
        // var iframe = document.createElement('iframe');
        // iframe.style.opacity = 0;
        // iframe.src = "/favicon.ico"
        // iframe.onload = function() {
        //     setTimeout(function() {
        //         iframe.remove();
        //     }, 0);
        // }
        // document.body.appendChild(iframe);
    };

    // 判断页面是否需要登录才能访问
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.user.token != null && store.state.user.userName) {
            next();
        }
        else {
            next({
                name: 'login',
                query: { redirect: to.fullPath }
            })
        }
    }
    else {
        next();
    }
})

export default router;