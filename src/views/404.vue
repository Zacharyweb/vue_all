<template>
    <div class="no-found">
        <span class="f26 c-555">抱歉，未找到相关页面</span>
        <div class="btn-area">
            <span @click="$router.replace({name:'home'})" class="btn btn-blue btn-middle">返回首页</span>
        </div>
    </div>
</template>
<script>
import HeaderBar from 'components/header.vue'

export default{
	data: function(){
		return {

		}
	},
     beforeRouteLeave (to, from, next){
        if(to.matched.length == 0){
            next({name:'home'});
        }else{
            next();
        };
    },
    components: {
      HeaderBar
    },
    mounted(){
        
    },
    methods: {
       
    }
}	
</script>

<style>
    .no-found{
        margin-top:1.4rem;
        padding-top:4.6rem;
        background:url(~images/no_found.png) no-repeat center 0;
        background-size:7.5rem 4.18rem;
        text-align:center;
    } 
    .no-found .btn-area{
        margin:.8rem 0 1rem;
        padding:0 1.6rem;
    }
</style>  