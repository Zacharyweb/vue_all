import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user' // 存储用户信息
import app from './modules/app'   // 存储模态框、toast等信息
import * as types from './mutation-types'

Vue.use(Vuex)


const state = {
	ajaxing:false,
	direction: 'forward',
	transitionState:true,
}

const getters = {
   
}

const actions = {
    toggleLoading({ commit },flag){
        commit(types.UPDATE_AJAX,flag);
	}
}


const mutations = {
	[types.UPDATE_AJAX] (state, status) {
		state.ajaxing= status;
	},
    [types.UPDATE_DIRECTION] (state, direction) {
      state.direction = direction
    },
    [types.UPDATE_TRANSITION] (state,status) {
      state.transitionState = status
    }
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules: {
		user,
		app
	},
})