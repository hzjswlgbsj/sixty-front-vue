<template>
  <div class="main-layout-structure-container" :style="mainLayout">
    <div v-if="!isIndex" class="main-layout-structure-topbar">
      <top-bar/>
    </div>
    <div class="main-layout-structure-introduction">
      <introduction v-if="isIndex"></introduction>
      <router-view></router-view>
    </div>
    <div v-if="!isIndex" class="main-layout-structure-footbar">
      <foot-bar></foot-bar>
    </div>
    <transition name="slide-fade">
      <div v-if="showReturnTop" @click="returnTop(1,80)" class="main-layout-structure-return-top">
        <icon name="chevron-up" scale="1.5" class="main-layout-structure-return-top-icon"></icon>
      </div>
    </transition>
  </div>
</template>

<script>
import TopBar from './TopBar'
import FootBar from './FootBar'
import Introduction from './Introduction'

export default {
  name: 'index',
  components: {
    'top-bar': TopBar,
    'foot-bar': FootBar,
    'introduction': Introduction
  },
  data () {
    return {
      isIndex: true,
      clientHeight: '',
      showReturnTop: false
    }
  },
  created () {
    this.isIndex = this.$route.name === 'Index'
    this.$Loading.config({
      color: '#5ab811',
      failedColor: '#c8f0d0',
      height: 2
    })
  },
  watch: {
    '$route' (to, from) {
      this.isIndex = to.name === 'Index'
    }
  },
  computed: {
    mainLayout () {
      if (this.isIndex) {
        return {
          height: `${this.clientHeight}px`
        }
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.clientHeight = document.body.clientHeight
      window.addEventListener('scroll', (e) => {
        this.showReturnTop = window.scrollY > 300
      })
    })
  },
  methods: {
    returnTop (acceleration, time) {
      let xScroll = document.documentElement.scrollLeft || document.body.scrollLeft || window.scrollLeft || 0 // 获取水平滚动坐标
      let yScroll = document.documentElement.scrollTop || document.body.scrollTop || window.scrollTop || 0 // 获取垂直滚动坐标
      let speed = 1 + acceleration // 滚动速度
      window.scrollTo(Math.floor(xScroll / speed), Math.floor(yScroll / speed)) // 屏幕滚动到某个坐标，因为speed大于1，所以x、y轴的坐标越来越小
      if (xScroll > 0 || yScroll > 0) { // 如果没有滚动到顶部就设置延迟time后继续滚动
        setTimeout(() => {
          this.returnTop(acceleration, time)
        }, time)
      }
    }
  }
}
</script>

<style lang="scss"  scoped>
  @import "../../style/base/base";
  .main-layout-structure-container {
    .main-layout-structure-introduction {
      width: 100%;
      height: 100%;
    }
    .main-layout-structure-return-top {
      width: 30px;
      height: 30px;
      background-color: $theme-color;
      border-radius: 50%;
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .main-layout-structure-return-top-icon {
        padding-bottom: 5px;
        color: #ffffff;
      }
      &:hover {
        cursor: pointer;
        background-color: $hover-color;
      }
    }
    .slide-fade-enter-active {
      transition: all 0.5s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
      opacity: 0;
    }
  }
</style>
