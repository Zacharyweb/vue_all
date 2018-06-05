/**
 * Created by Zachary on 18/06/15.
 * http配置
 */
import axios from 'axios'
import store from '../store'
import * as types from '../store/mutation-types'
import router from '../router'
import merge from 'libs/merge'
import util from 'libs/utils.js'
import md5 from 'js-md5'


const httpConfig = {	
    ip:'http://192.168.112.36:1112/app',
    version:'1.0.0',//接口版本号
    pageSize:10,//分页条数
    OS:'HTML'//平台类型
};

 /*需要加密的字段*/

const md5Mapper = [
    "password","payPassword", "newPayPassword",
];

const md5Pipe= function(param){
    return md5(param);
}

const http = axios.create({
//baseURL:httpConfig.ip+'/AppApi/v'+httpConfig.version,
  baseURL:httpConfig.ip + '/',
  timeout:5000,
  headers: {
      'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
    config => {
      // 带上存了的token
      if(store.state.user.token){
         config.headers.Authorization = store.state.user.token ;
      };


      const dataSource={};

      for(var i in config.data){
          if(md5Mapper.indexOf(i) !== -1 && config.data.hasOwnProperty(i)){
              config.data[i] = md5Pipe(config.data[i]).replace(/\s/g,'');
          }
      };

      if(config.method=='get'){
         config.params=merge({},dataSource,config.params)
      };

      config.data=merge({},dataSource,config.data)
     
      return config;
    }
);

http.interceptors.response.use(
    response => {
        if(response.data.status*1 === 1001 ){
            //表示授权过期
            //清除token信息并跳转到登录页面
            localStorage.removeItem('XG_TOKEN');
            localStorage.removeItem('XG_USERNAME');
            store.commit(types.SUCCESS_LOGOUT);
            router.replace({
                name: 'login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
        
        // 统一提示错误信息
        if(response.data.status*1 !== 0){
            store.dispatch('showMsg', {content:response.data.message})
        }
        return response;
    }
);

export default http;