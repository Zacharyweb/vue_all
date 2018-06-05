<template>
	<div class="watermelon_home">
       首页
	</div>
</template>
<script>
import api from 'api'
import {countdownFormat} from 'filter'
import HeaderBar from 'components/header.vue'
import {mapState,mapActions} from 'vuex'
require('swiper/dist/css/swiper.css')
export default{
	data: function(){
		return {
           
            
		}
	},
    components: {
        HeaderBar,
    },
    filters: {
       countdownFormat
    },
    computed: mapState({
        userInfo: state => state.user.userInfo
    }),
    created: function(){
       this.changeNav(0);
    },
    mounted:function(){
        this.getInitData();
    },
    methods: {
        ...mapActions([
          'getAccountInfo',
          'changeNav'
        ]),
        getInitData:function(){
           
        },
    }
}	
</script>
<style scoped>
.watermelon_home{
    padding-bottom: 1rem;
    background-color: #fff;
}
.top_block{
    width: 100%;
    height: 6.35rem;
    background-color: #2d3d4e;
    margin-bottom: 1rem;
    /* background:url(~images/icon_header.png) no-repeat; */
    /* background-size: 100% auto; */
    position: relative;
}
</style>