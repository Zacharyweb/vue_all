
<template>
<div class="user-register">
    <header-bar title="注册"></header-bar>
    <div class="step2-wrap" v-if="step==1">
        <div class="form regin-form">
            <div class="input-row">
                <div class="label">手机号码</div>
                <input type="tel" placeholder="请输入手机号码" maxLength="11" v-model="mobile" class="f28 c-000"/>
            </div>
           <div class="input-row">
                <div class="label">验证码</div>
                <input type="tel" placeholder="请输入验证码" maxLength="11" v-model="vcode" class="f28 c-000"/>
                <div class="send_vcode_btn">
                    <span class="c-gold f22" v-show="sendVcodeStatus == 1" @click="sendVcode">发送验证码</span>
                    <span class="c-gold f22" v-show="sendVcodeStatus == 2" >发送中</span>    
                    <span class="c-gold f22" v-show="sendVcodeStatus == 3">{{reSendCount}}s</span>
                    <span class="c-gold f22" v-show="sendVcodeStatus == 4" @click="sendVcode">重新发送</span>
                </div>
            </div>
            <div class="input-row">
                <div class="label">设置密码</div>
                <input :type="pwdType" placeholder="请设置为8-16位密码" maxLength="16" v-model="password" class="f28 c-000"/>
                <span class="float-icon icon-eyes" :class="{open:pwdType == 'text'}" @click="togglePwdType"></span>
            </div>

    
        </div>
    </div>
    <div class="btn-area" v-if="step == 1">
       <span @click="handleSubmit" 
              class="btn btn-gold btn-large" 
              :class="{disabled: !password.length ||
                                  ajaxing}"
       >确认注册</span>
    </div>

    <div class="agree-protocol" v-if="step == 1">
        <p>
            <!-- <input type="checkbox" id="checkProtocol" v-model="agreeProtocol"/>
            <label for="checkProtocol">我已阅读并同意<router-link :to="{name:'regProtocol'}">《锐银金服用户注册协议》</router-link></label> -->
        </p>
        <!-- <reg-protocol :show="showProtocol"  @close="showProtocol=false"></reg-protocol> -->
    </div>

    <modal></modal>
</div>
</template>
<script>
import api from 'api'
import HeaderBar from 'components/header.vue'
import Modal from 'components/modal.vue'
// import RegProtocol from 'components/protocol/regProtocol.vue'
import * as types from "mutationTypes";
import util from 'libs/utils.js'

import {mapState,mapActions} from 'vuex'
export default{
	data: function(){
		return {
            step:1,

            mobile:'',
            password:'',
            vcode:'',

            showProtocol:false,
            agreeProtocol:true,
            pwdType:'password',

            submiting:false,
            // 获取验证码相关
            sendVcodeStatus:1,
            initReSendCount:60,
            reSendCount:60,
            countTimer:null
		}
	},
    components: {
        HeaderBar,
        Modal
        // RegProtocol    
    },
    computed: mapState({
      ajaxing: state => state.ajaxing
    }),
    mounted(){
    
    },
	methods: {
        ...mapActions([
          'showMsg',
          'updateUserName'
        ]),
        // 发送验证码
        sendVcode(){
            if(this.mobile == ''){
                this.showMsg({content:'手机号码不能为空！'});return;
            };
            if(!/^1[3-8]\d{9}$/.test(this.mobile)){
                this.showMsg({content:'输入的手机号码格式有误'});return;
            };
            this.sendVcodeStatus = 2;

            this.axios.post(api.getCode,{
                mobile:this.mobile,
                type:'R',
            }).then(res => {
             
                if(res.data.status*1 == '0'){
                    this.sendVcodeStatus = 3;
                    this.startCount();
                }else{
                    this.sendVcodeStatus = 4;
                }
            });
        },
        startCount(){
            this.reSendCount = this.initReSendCount;
            this.countTimer = setInterval(()=>{
                this.reSendCount -= 1;
                if(this.reSendCount == -1){
                    clearInterval(this.countTimer);
                    this.sendVcodeStatus = 4;
                }
            },1000);
        },

   
        handleSubmit:function(){
            if(this.mobile == ''){
                this.showMsg({content:'手机号码不能为空'});
                return;
            };
            if(!/^1[3-8]\d{9}$/.test(this.mobile)){
                this.showMsg({content:'输入的手机号码格式有误'});
                return;
            };
            if(this.vcode== ''){
               this.showMsg({content:'手机验证码不能为空'});
               return;
            };
            if(this.password == ''){
               this.showMsg({content:'密码不能为空'});
               return;
            };
            if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)[^\s]{8,16}$/.test(this.password)){
                this.showMsg({content:'密码为8-16位字母+数字，不含空格'});
                return;
            };

            // if(!this.agreeProtocol){
            //     this.showMsg({content:'您必须先同意注册协议'});
            //     return;
            // }

            if(this.submiting) return;
            this.submiting = true;
            this.register();
        },
        register:function(){

            this.axios.post(api.regist,{
                userName:this.mobile,
                password:this.password,
                code:this.vcode
            }).then(res => {
                if(res.data.status*1 == '0'){
                    this.showMsg({content:'注册成功'});
                    setTimeout(()=>{
                       this.toAutoLogin(res.data);  
                    },1500);
                };
                this.submiting = false;
            });

        },
        toAutoLogin(result){
            let redirect = decodeURIComponent(this.$route.query.redirect || "/");
            localStorage.setItem("XG_TOKEN", result.data);
            this.$store.commit(types.SUCCESS_LOGIN, { token: result.data });
            localStorage.setItem("XG_USERNAME", this.mobile);
            this.updateUserName(this.mobile);

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

            if (redirect) {
              this.$router.replace({ path: redirect });
            } else {
              this.$router.replace({ name: "home" });
            }
        },
        togglePwdType(){
            let type = this.pwdType;
            if(type == 'text'){
                this.pwdType = 'password';
            }else{
                this.pwdType = 'text';
            }
        }
    },
    watch:{
        vcode:function(val){
            if(val.length > 6){
                this.vcode = val.slice(0,6);
            }
        }
    }
}	
</script>
<style scoped>
    .user-register{
        padding-top: 0.2rem;
    }
    .user-register .btn-area{
        margin-top:0.4rem;
        padding: 0 0.3rem;
    }
    .user-register .form .send_vcode_btn{
        bottom:0.25rem;
    }
    .user-register .agree-protocol{
        /*margin-left:1.05rem;*/
    }
</style>