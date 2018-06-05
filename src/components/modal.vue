<style scoped>
    .modal{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        text-align: center;
        z-index: 9999;
    }
    .modal-box{
        position:absolute;
        top:45%;
        left:50%;
        width:6rem;
        margin-left:-3rem;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
    }
    .modal-box .content{
        padding:.4rem .2rem;
        border-bottom: 1px solid #eee;
        word-break:break-all;
        line-height:1.5;
    }

    .modal-box .btns{
        height:.8rem;
        line-height:.8rem;
    }
    .modal-box .btns span{
        display:block;
    }

    .modal-box .btns.two span{
        width:50%;
        float:left;
    }

    .modal-box .btns.two span:first-child{
        border-right:1px solid #eee;
    }
</style>
<template>
	<div class="modal" v-show="show">
        <div class="modal-box scaleIn c-666" ref="modal-box" :style="{'margin-top':mt}">
            <div class="content f28" v-html="modal.content"></div>
            <div class="btns f28" :class="{ two: modal.btns.length > 1}">
                <span v-for="(btn,index) in modal.btns" v-if="index < 2" @click="handleClick(modal.callbacks[index])">{{btn}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
	computed: mapState({
		modal: state => state.app.modal
	}),
    data: function(){
		return {
			show:false,
            mt:''
		}
	},
    methods: {
        handleClick:function(callback){
        	this.show=false;
        	if(callback && typeof(callback)==='function'){
        		callback()
        	}
        }
    },
    watch: {
  		'modal': {
  			handler: function(val, oldVal){
		    	this.show=true;
                this.$nextTick(()=>{
                  this.mt='-'+this.$refs['modal-box'].offsetHeight/2+'px';
                })
  			},
  			deep: true
  		}
  	}
}	
</script>