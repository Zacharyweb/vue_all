import * as types from '../mutation-types'
import axios from 'http'
import api from 'api'


// initial state
const state = {
    token:null,
    userName:'',
    userInfo:null,
    deviceInfo:null,
    localInfo:null,
    contactsInfo:null
}

// getters
const getters = {
   
}

// actions
const actions = {
    getUserInfo({ commit },options) {
        return axios.get(api.getUserInfo).then(res => {
            console.log(res);
            commit(types.RECEIVE_USERINFO,res.data.result);
            return res;
        })  
    },

    updateUserName({ commit },data) {
        commit(types.UPDATE_USERNAME,data);
    },
}


// mutations
const mutations = {
    [types.UPDATE_USERNAME]: (state, data) => {
        state.userName = data;
    },

    [types.RECEIVE_USERINFO]: (state, data) => {
        state.userInfo = data;
    },
    [types.SUCCESS_LOGIN]: (state, data) => {
        state.token = data.token;
    },
    [types.SUCCESS_LOGOUT]: (state) => {
        state.token = null;
        state.userName = null;
    },

    [types.RECEIVE_DEVICEINFO]: (state, data) => {
        state.deviceInfo = data;
    },
    [types.RECEIVE_LOCALINFO]: (state, data) => {
        console.log(data);
        state.localInfo = data;
    },
    [types.RECEIVE_CONTACTS]: (state, data) => {
        state.contactsInfo = data;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}