<style scoped>
.out-enter-active,
.out-leave-active,
.in-enter-active,
.in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  backface-visibility: hidden;
  perspective: 1000;
}
.out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
<template>
  <div id="app" class="layout">
<!--       <transition :name="direction === 'forward' ? 'in' : 'out'" @after-enter="afterEnter" @before-enter="beforeEnter">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
      </transition>
      <transition :name="direction === 'forward' ? 'in' : 'out'" @after-enter="afterEnter" @before-enter="beforeEnter">
        <router-view v-if="!$route.meta.keepAlive" v-show="init"></router-view>
      </transition> -->

      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>

      <!-- <router-view v-if="!$route.meta.keepAlive && $route.meta.noSlideIn" v-show="init"></router-view>
      <transition :name="direction === 'forward' ? 'in' : 'out'" @after-enter="afterEnter" @before-enter="beforeEnter">
            <router-view v-if="!$route.meta.keepAlive && !$route.meta.noSlideIn" v-show="init"></router-view>
      </transition> -->

      <router-view v-if="!$route.meta.keepAlive" v-show="init"></router-view>

      <loading></loading>
      <modal></modal>
      <toast></toast>
      <bottom-nav :nav-path="navPath"></bottom-nav>
  </div>
</template>
<script>

import Loading from './components/loading.vue'
import Modal from './components/modal.vue'
import Toast from './components/msg.vue'
import BottomNav from 'components/bottomNav.vue'
import * as types from './store/mutation-types'
import { mapState } from 'vuex'

require("./assets/css/common.css");
export default {
  data: function (){
    return {
        init:false,
        navPath:[{name:'home'},{name:'home'},{name:'home'}]
    }
  },
  mounted: function(){
      this.init=true;
  },
  components: {
     Loading,
     Modal,
     Toast,
     BottomNav
  },
  computed:{
    ...mapState({
      direction: state => state.direction
    })
  },
  methods: {
    afterEnter(){
      // this.$store.commit(types.UPDATE_TRANSITION,false)
    },
    beforeEnter: function (el) {
      // this.$store.commit(types.UPDATE_TRANSITION,true)
    }
  }
}
</script>