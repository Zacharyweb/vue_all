<template lang="html">
    <div class="yo-scroll"
         :style="{'bottom': bottom + 'rem','top' : top + 'rem'}"
         :class="{touch:touching}"
         @touchstart="touchStart($event)" 
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)"
    >
    <section class="inner" :style="{ transform: 'translate3d(0, ' + transateTop + 'px, 0)' }">
        <header class="pull-refresh" ref="yoScrollHeader">
          <img class="refresh_icon" src="https://img.51fanbei.com/h5/common/icon/refresh_icon.gif">
          <div class="down-tip" v-show="state == 0">下拉刷新</div>
          <div class="up-tip" v-show="state == 1">松开刷新</div>
          <div class="refresh-tip" v-show="state == 2">正在刷新</div>
          <div class="refresh-finish" v-show="state == 3">刷新完成</div>
        </header>
        <slot></slot>
    </section>
    </div>
</template>

<script>
export default {
  props: {
    // 面版顶部
    top: {
      type: Number,
      required:false
    },

    // 面板的底部
    bottom: {
      type: Number,
      default: 0
    },

    // 能否下拉刷新
    enableRefresh: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      offset: 100, // 滑动触发更新的距离
      resultTop: 0, // 下拉刷新面版的顶部距离 单位rem

      enablePullDownFlagHeight: 0, // 当inner的顶部距离屏幕顶部的值大于该值是可以下拉
      state: 0, // 下拉刷新状态 0未下拉 1松开刷新 2刷新中 3刷新完成
      touching: false, // 是否在触摸

      transateTop: 0,
      startY: 0
    };
  },
  methods: {
    initUpRefreshData() {
      var windowWidth = window.screen.width;
      this.offset = windowWidth / 7.5 * 2;
      this.resultTop = this.top;

      if(this.resultTop || this.resultTop === 0){
        this.enablePullDownFlagHeight = -(windowWidth / 7.5) * 2.01;
        return;
      };

      if (Global.android) {
        // android机型
        this.resultTop = 0.88;
      } else {
        // ios机型
        if (Global.iphoneX) {
          this.resultTop = 1.8;
        } else {
          this.resultTop = 1.28;
        }
      }
      this.enablePullDownFlagHeight = -(windowWidth / 7.5) * (2 - this.resultTop + 0.01);
    },
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
      this.startScroll = this.$el.scrollTop || 0;
      this.touching = true;
    },
    touchMove(e) {
      let yoScrollHeader = this.$refs.yoScrollHeader;
      let flagTop = yoScrollHeader.getBoundingClientRect().top;

      if (
        !this.enableRefresh ||
        flagTop < this.enablePullDownFlagHeight ||
        !this.touching
      ) {
        return;
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
      if (diff > 0) e.preventDefault();
      this.transateTop =
        Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);

      if (this.state == 2) {
        // 刷新中
        return;
      }
      if (this.transateTop >= this.offset) {
        this.state = 1;
      } else {
        this.state = 0;
      }
    },
    touchEnd(e) {
      if (!this.enableRefresh) return;
      this.touching = false;
      if (this.state == 2) {
        // 还在刷新中
        this.state = 2;
        this.transateTop = this.offset;
        return;
      }
      if (this.transateTop >= this.offset) {
        // 去刷新
        this.refresh();
      } else {
        // 取消刷新
        this.state = 0;
        this.transateTop = 0;
      }
    },
    refresh() {
      this.state = 2;
      this.transateTop = this.offset;
      this.onRefresh(this.refreshDone);
    },
    refreshDone() {
      this.state = 3;
      setTimeout(() => {
        this.state = 0;
        this.transateTop = 0;
      }, 500);
    },

    // 刷新前所有数据置空
    onRefresh(done) {
      this.$emit("refresh", done);
    }
  },
  mounted() {
    this.initUpRefreshData();
  }
};
</script>
<style scoped>
.yo-scroll {
  position: absolute;
  right: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.yo-scroll .inner {
  position: absolute;
  top: -2rem;
  width: 100%;
  transition-duration: 300ms;
  color: #999;
  font-size: 0.28rem;
}
.yo-scroll.touch .inner {
  transition-duration: 0ms;
}
.yo-scroll .pull-refresh {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.yo-scroll .pull-refresh .refresh_icon {
  height: 1.5rem;
  width: auto;
  margin-bottom: 0.1rem;
}
</style>
