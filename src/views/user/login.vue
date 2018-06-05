<template>
    <div class="user-login">
        <header-bar title="西瓜信用"></header-bar>
        <div class="banner">
            <span class="login_type_btn f26 c-gold" @click="changeLoginType(2)" v-show="loginType == 1">密码登录</span>
            <span class="login_type_btn f26 c-gold" @click="changeLoginType(1)" v-show="loginType == 2">验证码登录</span>
        </div>
        
        <div class="form login-form">
            <div class="icon-input-row">
                <div class="form-icon-wrap">
                    <span class="form-icon icon-username"></span>
                </div>
                <input type="tel" placeholder="请输入手机号" v-model="mobile" maxlength="11" class="f36 c-333" @focus="forgetPwdShow = false" @blur="forgetPwdShow = true" />
                <span class="float-icon icon-close" v-if="mobile.length > 0" @click="cleanInput(0)"></span>
            </div>
            <div class="icon-input-row" v-show="loginType == 1">
                <div class="form-icon-wrap">
                    <span class="form-icon icon-password"></span>
                </div>
                <input type="number" placeholder="请输入验证码" maxlength="6" v-model="vcode" class="f36 c-333" @focus="forgetPwdShow = false" @blur="forgetPwdShow = true" />
                <div class="send_vcode_btn">
                    <span class="c-gold f22" v-show="sendVcodeStatus == 1" @click="sendVcode">发送验证码</span>
                    <span class="c-gold f22" v-show="sendVcodeStatus == 2">发送中</span>
                    <span class="c-gold f22" v-show="sendVcodeStatus == 3">{{reSendCount}}s</span>
                    <span class="c-gold f22" v-show="sendVcodeStatus == 4" @click="sendVcode">重新发送</span>
                </div>
            </div>
            <div class="icon-input-row" v-show="loginType == 2">
                <div class="form-icon-wrap">
                    <span class="form-icon icon-password"></span>
                </div>
                <input :type="pwdType" placeholder="请输入密码" maxlength="18" v-model="password" class="f36 c-333" @focus="forgetPwdShow = false" @blur="forgetPwdShow = true"/>
                <span class="float-icon icon-close" style="right:0.68rem;" v-if="password.length > 0" @click="cleanInput(1)"></span>
                <span class="float-icon icon-eyes" :class="{open:pwdType == 'text'}" @click="togglePwdType"></span>
            </div>
        </div>

        <div class="btn-area">
            <span class="btn btn-gold btn-large" :class="{disabled: !mobile.length || !password.length || ajaxing}" @click="toLogin">登录</span>
            <!-- <router-link :to="{ name: 'register',query:{redirect:$route.query.redirect} }" @click="toResign" class="btn btn-gold-outline btn-large">注册</router-link> -->
            <span  @click="toResign" class="btn btn-gold-outline btn-large">注册</span>
        </div>

        <!-- <div class="find-pwd-wrap" v-show="forgetPwdShow">
        <router-link :to="{ name: 'findPwd'}">忘记密码？</router-link>
    </div> -->

    </div>
</template>
<script>
import api from "api";
import util from 'libs/utils.js'
import HeaderBar from "components/header.vue";
// import CSCookie from "libs/CSCookie";
// import httpConfig from "httpConfig";
import * as types from "mutationTypes";

import { mapState, mapActions } from "vuex";

export default {
  data: function() {
    return {
      mobile: "",
      vcode: "",
      password: "",
      mode: "0",
      forgetPwdShow: true,
      pwdType: "password",

      loginType:1,

      submiting:false,
      // 获取验证码相关
      sendVcodeStatus: 1,
      initReSendCount: 60,
      reSendCount: 60,
      countTimer: null
    };
  },
  components: {
    HeaderBar
  },
  computed: mapState({
    ajaxing: state => state.ajaxing
  }),
  methods: {
    ...mapActions(["showMsg","updateUserName"]),
    toResign(){
        this.$router.replace({name: 'register',query:{redirect:this.$route.query.redirect}});
    },
    toLogin(){
      if(this.loginType == 1){
        this.loginByVCode();
      }else{
        this.loginByPassword();
      }
    },
    // 密码登录
    loginByPassword() {
      if (this.submiting) {
        return;
      }
      if (this.mobile == "") {
        this.showMsg({ content: "手机号码不能为空！" });
        return;
      };

      if (!/^1[3-8]\d{9}$/.test(this.mobile)) {
        this.showMsg({ content: "输入的手机号码格式有误" });
        return;
      };

      if (this.password == "") {
        this.showMsg({ content: "密码不能为空" });
        return;
      };

      if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)[^\s]{6,18}$/.test(this.password)) {
        this.showMsg({ content: "密码格式有误" });
        return;
      };

      this.submiting = true;
      let data = {
        userName: this.mobile,
        password: this.password
      };
      this.axios.post(api.loginByPassword, data).then(res => {
        this.submiting = false;
        if (res.data.status*1 == 0) {
            this.handleLoginAfter(res.data);
        }
      });
    },
    // 验证码登录
    loginByVCode() {
      if (this.submiting) {
        return;
      };
      if (this.mobile == "") {
        this.showMsg({ content: "手机号码不能为空！" });
        return;
      };
      if (!/^1[3-8]\d{9}$/.test(this.mobile)) {
        this.showMsg({ content: "输入的手机号码格式有误" });
        return;
      };
      if (this.vcode == "") {
        this.showMsg({ content: "验证码不能为空" });
        return;
      };
      if (this.vcode.length != 6) {
        this.showMsg({ content: "验证码格式有误" });
        return;
      };
      this.submiting = true;

      let data = {
        userName: this.mobile,
        code: this.vcode
      };
      this.axios.post(api.loginByVCode, data).then(res => {
        this.submiting = false;
     
        if (res.data.status*1 == 0) {
          this.handleLoginAfter(res.data);
        }
      });
    },
    handleLoginAfter(result) {
      let redirect = decodeURIComponent(this.$route.query.redirect || "/");
      localStorage.setItem("XG_TOKEN", result.data);
      this.$store.commit(types.SUCCESS_LOGIN, { token: result.data });

      localStorage.setItem("XG_USERNAME", this.mobile);
      this.updateUserName(this.mobile);

      // localStorage.setItem('XG_USER',JSON.stringify(result));
      // this.$store.commit(types.RECEIVE_USERINFO,result);

      // 传给客户端
      let dataObj = {
          mobile:this.mobile,
          token:result.data
      };
      if(util.getBlatFrom() == 1){ 
          alaAndroid.login(JSON.stringify(dataObj));
      }else if(util.getBlatFrom() == 2){
          window.webkit.messageHandlers.login.postMessage(JSON.stringify(dataObj));
      }else{
          this.showMsg({ content: "请在app端打开" });
      };

      // 返回之前的页面
      if (redirect) {
        this.$router.replace({ path: redirect });
      } else {
        this.$router.replace({ name: "home" });
      }
    },

    sendVcode() {
        if (this.mobile == "") {
          this.showMsg({ content: "手机号码不能为空！" });
          return;
        }
        if (!/^1[3-8]\d{9}$/.test(this.mobile)) {
          this.showMsg({ content: "输入的手机号码格式有误" });
          return;
        }
        this.sendVcodeStatus = 2;
  
        this.axios.post(api.getCode, {
          mobile: this.mobile,
          type: "L"
        }).then(res => {
          if (res.data.status * 1 == "0") {
            this.sendVcodeStatus = 3;
            this.startCount();
          } else {
            this.sendVcodeStatus = 4;
            this.showMsg({ content: res.data.message });
          }
        });
    },

    startCount() {
      this.reSendCount = this.initReSendCount;

      this.countTimer = setInterval(() => {
        this.reSendCount -= 1;
        if (this.reSendCount == -1) {
            clearInterval(this.countTimer);
            this.sendVcodeStatus = 4;
        }
      }, 1000);
    },
    changeLoginType(type){
        this.mobile = "";
        this.vcode = "";
        this.password = "";
        this.loginType = type;
    },
    togglePwdType() {
      let type = this.pwdType;
      if (type == "text") {
        this.pwdType = "password";
      } else {
        this.pwdType = "text";
      }
    },

    cleanInput(type) {
      if (type) {
        this.password = "";
        return;
      }
      this.mobile = "";
    }
  },
  watch: {
    vcode: function(val) {
      if (val.length > 6) {
        this.vcode = val.slice(0, 6);
      }
    }
  }
};
</script>
<style scoped>
.user-login {
  background-color: #fff;
  min-height: 100vh;
}
.user-login .banner {
  /* height: 2.8rem;
  background: url(~images/logo_xgxy.png) no-repeat center 1.2rem;
  background-size: 3.1rem auto; */
  height: 0.8rem;
  position: relative;
}
.user-login .banner .login_type_btn{
    position: absolute;
    top:0.2rem;
    right: 0.2rem;
}
.user-login .login-form {
  padding-top: 0.01rem;
  padding-bottom: 0.38rem;
}
.user-login .btn-area {
  margin-top: 0.42rem;
  padding: 0 0.3rem;
}
.user-login .btn-area .btn {
  margin-top: 0.4rem;
}

.user-login .find-pwd-wrap {
  position: absolute;
  width: 100%;
  padding: 0 0.3rem 0.2rem;
  text-align: center;
  left: 0;
  bottom: 0;
}
.user-login .find-pwd-wrap a {
  line-height: 0.7rem;
  font-size: 0.28rem;
  color: #555;
}


</style>