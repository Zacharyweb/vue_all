<style scoped>
	.msg{
		position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    text-align: center;
	    z-index: 9999;
	}
	.msg .content{
		position: absolute;
	    top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		border-radius: 0.06rem;
	    padding:.2rem .3rem;
	    line-height: 1.5;
		background-color: rgba(0,0,0,0.6);
		color: #fff;
		font-size: 0.26rem;
	    word-break:break-all;
	}
</style>
<template>
	<div class="msg"  v-show="msg.show">
		<div class="content">
			{{msg.content}}
		</div>
	</div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
	data: function(){
        return {
           timeout:null
        }
    },
	computed: mapState({
		msg: state => state.app.msg
	}),
	methods: {
        ...mapActions([
          'hideMsg'
        ])
    },
  	watch: {
  		'msg': {
  			handler: function(val, oldVal){
  				if(val.show == oldVal.show) return;
  				clearTimeout(this.timeout);
  				this.timeout=setTimeout(()=>{
		            this.hideMsg();
		            if(val.callback && typeof(val.callback)==='function'){
		            	val.callback()
		            }
		        },1500);
  			},
  			deep: true
  		}
  	}
}	
</script>