<template>
    <div class="header_bar_outer" :class="{'isios':isIos && !isIosX,'isiosX':isIos && isIosX}">
        <div class="header_bar"> 
            <img src="~images/back.png" class="return_icon" @click="clickReturn" v-if="showReturn">
             {{title}}
            <div class="right_area_520">
                <slot name="right"></slot>    
            </div>    
        </div>
         
    </div>
</template>
<script>

import util from 'libs/utils.js'

export default{
    data: function(){
        return {
           isIos: false,
           isIosX: false
        }
    },
    props:{
        title:{
            type:String,
            required:true
        },
        showReturn:{
            type:Boolean,
            default:true
        },
        returnRouterName:{
            type:String,
            required:false
        }
    },
    mounted(){
    
        if (util.getBlatFrom() == 1) {  
            this.isIos = false;
            this.isIosX = false;
        } else if(util.getBlatFrom() == 2) { 
            // 判断是ios 
            this.isIos = true;
            if(/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)){
                // 判断是不是X
                this.isIosX = true;
            };
        }
    },
    methods: {
         clickReturn(){
            
            if(this.returnRouterName){
                this.$router.push({name:this.returnRouterName});
            }else{
              this.$router.go(-1);  
            }
         }
    }
}   
</script>
<style scoped>
  .header_bar_outer{
    height: 1rem;
  }
  .header_bar_outer.isios{
    height: 1.4rem;
  }
  .header_bar_outer.isiosX{
    height: 1.88rem;
  }
  .header_bar_outer .header_bar{
      position: fixed;
      top:0;
      left: 0;
      height: 1rem;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.32rem;
      color: #000;
      box-sizing: content-box;
  }

  .header_bar_outer.isios .header_bar{
      padding-top: 0.4rem;
  }
  .header_bar_outer.isiosX .header_bar{
      padding-top: 0.88rem;
  }

  .header_bar_outer .header_bar .return_icon{
       position: absolute;
       height: 0.36rem;
       width: auto;
       bottom: 0.32rem;
       left: 0.3rem;
  }
  .header_bar_outer .header_bar .right_area_520{
      position: absolute;
      height: 1rem;
      bottom: 0;
      display: flex;
      align-items: center;

      right: 0.3rem;
  }
</style>