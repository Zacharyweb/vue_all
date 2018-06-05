<template>
   <!-- 下拉刷新 -->
  <pull-refresh :bottom="0" :top="1" :enableRefresh="true" @refresh="refreshData" id="yoScroll">
      <div class="index-banners">
          <swiper :options="swiperOption" v-if="bannerList.length > 0">
              <swiper-slide v-for="(item,index) in bannerList" :key="index">
                <div class="slide-item">
                  <img v-if="item.imgUrl" :src="item.imgUrl" style="width:100%;">
                  <img v-else src="~images/no_found.png" style="width:100%;">
                </div>
              </swiper-slide>
              <div v-if="bannerList.length > 1" class="swiper-pagination" slot="pagination"></div>
          </swiper>
      </div>
	    <div class="watermelon_demo">
            <p class="tirgger_btn f28" @click="ShowModal">ShowModal</p>
            <p class="tirgger_btn f28" @click="ShowModal2">ShowModal2</p>
            <p class="tirgger_btn f28" @click="ShowMsg">ShowMsg</p>
	    </div>

      <ul class="list_wrapper">
        <li class="list_item" v-for="(item,index) in demoList" :key="index">{{index}}</li>
      </ul>
      <infinite-load :scroll-target="scrollTarget" :is-loading="isLoading" :is-nomore="isNomre" @load="loadMoreData"></infinite-load>
      
  </pull-refresh>
</template>
<script>
import api from "api";
import { countdownFormat } from "filter";

import { mapState, mapActions } from "vuex";

import pullRefresh from "components/pullRefresh.vue";
import infiniteLoad from "components/infiniteLoad.vue";

require("swiper/dist/css/swiper.css");
let demoList2 =[0,1,2,3,4,5,6,7,8,9];
export default {
  data: function() {
    return {
      isLoading:false,
      isNomre:false,
      demoList:[0,1,2,3,4,5,6,7,8,9],
      scrollTarget:'#yoScroll',
      swiperOption: {
        pagination: '.swiper-pagination',
        observer: true,
        observeParents: true,
        autoplay: 2000,
        loop: true,
        autoplayDisableOnInteraction: false
      },
      bannerList:[{imgUrl:'src/assets/images/banner_demo1.png'},{imgUrl:'src/assets/images/banner_demo2.png'},{imgUrl:'src/assets/images/banner_demo3.png'}]
    };
  },
  components: {
    pullRefresh,
    infiniteLoad
  },
  filters: {
    countdownFormat
  },
  computed: mapState({
    userInfo: state => state.user.userInfo
  }),
  created: function() {},

  methods: {
    ...mapActions(["showModal", "showMsg"]),

    ShowModal() {
      this.showModal({
        content: "模态案例1",
        btns: ["好的"],
        callbacks: []
      });
    },

    ShowModal2() {
      this.showModal({
        content: "模态案例2",
        callbacks: [this.confirmCb, this.cancelCb]
      });
    },

    confirmCb() {
      console.log("确定");
    },
    cancelCb() {
      console.log("取消");
    },

    ShowMsg() {
      this.showMsg({
        content: "示例Tost",
        // callback:this.confirmCb
      });
    },

    refreshData(done){
      setTimeout(()=>{
        done();
      },2000)
    },

    loadMoreData(){
      this.isLoading = true;
      setTimeout(()=>{
        this.demoList = [...this.demoList,...demoList2];
        if(this.demoList.length > 45){
          this.isNomre = true;
        };
        this.isLoading = false;
      },2000)
    }
  }
};
</script>
<style>
.watermelon_demo {
  padding: 0.5rem;
}
.tirgger_btn {
  text-align: center;
  line-height: 2;
}

.list_item{
  height: 1rem;
  line-height: 1rem;
  background-color: pink;
  text-align: center;
  margin-bottom: 0.2rem;
}


.index-banners .swiper-pagination-bullet{
    width: 0.12rem;
    height: 0.12rem;
    margin:0 0.06rem!important;
    opacity: 1;
    background: #dadbde;
}
.index-banners .swiper-pagination-bullet-active{
    background:#afafaf;
}
</style>