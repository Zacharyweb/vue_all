<style scoped>
    .infinite_load_bar{
        min-height: 1px;
    }
    .infinite_load_tip{
        line-height:1rem;
        text-align:center;
        font-size: 0.26rem;
    }
</style>
<template>
	<div class="infinite_load_bar" ref="infiniteLoadBar">
        <p class="infinite_load_tip" v-show="tipsShow && !isLoading && !isNomore">上拉加载更多</p>
        <p class="infinite_load_tip" v-show="tipsShow && isLoading && !isNomore">拼命加载中</p>
        <p class="infinite_load_tip" v-show="tipsShow && isNomore">没有更多啦</p>        
    </div>   
</template>
<script>

export default{
    data(){
        return {
      
        }
    },
	props:{

        tipsShow:{
            type:Boolean,
            default:true
        },
        isLoading:{
            type:Boolean,
            default:false
        },
        isNomore:{
            type:Boolean,
            default:false
        },
        // 滚动发生的容器，可传class，id等，不传默认是window
        scrollTarget:{
            type:String,
            default:''
        }
    },
    methods:{
        initScrollEvent(){
            let infiniteLoadBar = this.$refs.infiniteLoadBar;
            let timer = null;
            let scrollTarget = document.querySelector(this.scrollTarget) || window;
            let windowHeight = window.screen.height;
            let _this = this;

            function scrollCb(){
               let top = infiniteLoadBar.getBoundingClientRect().top;
               if(top && top < windowHeight){
                   _this.loadMore();
               }
            };
            scrollTarget.addEventListener('scroll',()=>{
               if(timer){
                 clearTimeout(timer);
               };
               if(_this.isLoading){
                   return;
               };
               if(_this.isNomore){
                   return;
               };
             
               timer = setTimeout(scrollCb,50)
            })


        },
        loadMore(){
            this.$emit('load');
        }
    },
    mounted(){
        this.$nextTick(()=>{
             this.initScrollEvent();
        });
    },
   
}	
</script>