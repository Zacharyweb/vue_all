'use strict'
export default [
	{
	    path: '/demo',
	    name: 'demo',
	    meta: {
	    	title:'示例',
	    	requireAuth:false
	    },
	    component: function(resolve) {
	    	require(['@/views/demo.vue'], resolve);
	  	}
	},
	{
	    path: '/',
	    redirect: '/home',
	},
	{
	    path: '/home',
	    name: 'home',
	    meta: {
			title:'主页',
			noSlideIn:true
	    },
	    component: function(resolve) {
	    	require(['@/views/home/index.vue'], resolve);
	  	}
	},
	{
	    path: '/login',
	    name: 'login',
	    meta: {
	        title:'登录'
	    },
	    component: function(resolve) {
	    	require(['@/views/user/login.vue'], resolve);
	  	}
	},
	{
	    path: '/register',
	    name: 'register',
	    meta: {
	        title:'注册'
	    },
	    component: function(resolve) {
	    	require(['@/views/user/register.vue'], resolve);
	  	}
	},
	{
	   	path: '*',
	    name: 'notFound',
	    meta: {
	        title:'404未找到页面'
	    },
	    component: function(resolve) {
	    	require(['@/views/404.vue'], resolve);
	  	}
	}
]
