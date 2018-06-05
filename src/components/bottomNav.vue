<template>
	<div class="bottom_nav" v-if="show">
		<ul class="bottom_nav_list">
			<li class="bottom_nav_item"  @click="clickNav(0)">
				<img class="nav_icon" v-show="currentNav != 0 " src="~images/bottom_icon1.png">
				<img class="nav_icon" v-show="currentNav == 0 " src="~images/bottom_icon1_active.png">
				<span class="nav_name" :class="{'active':currentNav == 0 }" >信用分</span>
			</li>
			<li class="bottom_nav_item"  @click="clickNav(1)">
				<img class="nav_icon" v-show="currentNav != 1 " src="~images/bottom_icon2.png">
				<img class="nav_icon" v-show="currentNav == 1 " src="~images/bottom_icon2_active.png">
				<span class="nav_name" :class="{'active':currentNav == 1 }" >提升信用</span>
			</li>	
			<li class="bottom_nav_item" @click="clickNav(2)">
				<img class="nav_icon" v-show="currentNav != 2 " src="~images/bottom_icon3.png">
				<img class="nav_icon" v-show="currentNav == 2 " src="~images/bottom_icon3_active.png">
				<span class="nav_name" :class="{'active':currentNav == 2 }" >我的</span>
			</li>	
		</ul>
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
	props:{
      navPath:{
		  type:Array,
		  require:true
	  }
	},
	computed: mapState({
		currentNav: state => state.app.currentNav,
		show: state => state.app.navShow,
	}),
	methods: {
        ...mapActions([
          'changeNav'
		]),
		clickNav(index){
			// this.changeNav(-1);
			let name = this.navPath[index].name;
		    this.$router.push({name:name});
		}
    },
 
}	
</script>

<style scoped>
.bottom_nav{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	background-color: #fff;
	height: 1rem;
	box-shadow:0 0 0.2rem 0 rgba(223,223,223,0.63);
}
.bottom_nav .bottom_nav_list{
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
}
.bottom_nav .bottom_nav_item{
	height: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.bottom_nav .bottom_nav_item .nav_icon{

	height: 0.45rem;
	width: auto;
}
.bottom_nav .bottom_nav_item .nav_name{
	font-size: 0.2rem;
	color: #aaa;
	line-height: 1.2;
	margin-top: 0.1rem;
}
.bottom_nav .bottom_nav_item .nav_name.active{
	color: #2c3e4d;
}
</style>