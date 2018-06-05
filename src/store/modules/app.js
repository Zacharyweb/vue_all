import * as types from '../mutation-types'

// initial state
const state = {
    msg: {
        show: false,
        content:'',
        callback:''
    },

    modal:{
        content:'',
        btns:['确定','取消'],
        callbacks:[()=>{},()=>{}]
    },
    currentNav:-1,
    navShow:true
}

// getters
const getters = {
   
}

// actions
const actions = {
    showMsg({ commit },data) {
        commit(types.SHOW_MSG,data)
    },
    hideMsg({ commit }) {
        commit(types.HIDE_MSG)
    },
    showModal({ commit },data) {
        commit(types.SHOW_MODAL,data)
    },
    changeNav({commit},num){
        commit(types.CHANGE_NAV,num)
    },
    showNav({commit}){
        commit(types.SHOW_NAV)
    },
    hideNav({commit}){
        commit(types.HIDE_NAV)
    }
}


// mutations
const mutations = {
    [types.SHOW_MSG]: (state,data) => {
        state.msg = {
            show:true,
            content:data.content
        }
        if(data.callback && typeof(data.callback)==='function'){
            state.msg.callback=data.callback;
        }
    },
    [types.HIDE_MSG]: (state, data) => {
        state.msg = {
            show:false,
            content:'',
            callback:null
        }
    },
    [types.SHOW_MODAL]: (state,data) => {
        state.modal.content = data.content;
        if(!data.btns || data.btns.length == 0){
            data.btns = ['确定','取消'];
        };
        state.modal.btns = data.btns;

        if(!data.callbacks || data.callbacks.length == 0){
            data.callbacks = [()=>{},()=>{}]
        };
        if(data.callbacks.length == 1){
            data.callbacks.push(()=>{});
        };
        state.modal.callbacks = data.callbacks; 
    },
    [types.HIDE_MODAL]: (state, data) => {
        state.modal = data
    },
    [types.CHANGE_NAV]: (state, num) => {
        state.currentNav = num
    },
    [types.SHOW_NAV]: (state) => {
        state.navShow = true
    },
    [types.HIDE_NAV]: (state) => {
        state.navShow = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}