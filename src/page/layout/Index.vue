<template>
  <div class="main-layout-structure-container" :style="mainLayout">
    <div v-if="!isIndex" class="main-layout-structure-topbar">
      <top-bar/>
    </div>

    <div class="main-layout-structure-content" id='content-container'>
      <div class="main-layout-structure-introduction">
        <introduction v-if="isIndex"></introduction>
        <router-view></router-view>
      </div>
      <div v-if="!isIndex" class="main-layout-structure-footbar">
        <foot-bar></foot-bar>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="showReturnTop && !isDetail" @click="returnTop(1,80)" class="main-layout-structure-return-top return-top-pc">
        <span class="main-layout-structure-return-top-text">返回顶部</span>
      </div>

      <div v-if="showReturnTop && isDetail" @click="returnTop(1,80)" class="main-layout-structure-return-top return-top-pc2">
        <icon name="chevron-up" scale="1" class="main-layout-structure-return-top-icon"></icon>
      </div>
    </transition>

    <transition name="slide-fade">
      <div v-if="showReturnTop" @click="returnTop(1,80)" class="main-layout-structure-return-top return-top-phone">
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
      isDetail: false,
      clientHeight: '',
      showReturnTop: false
    }
  },

  created () {
    this.isIndex = this.$route.name === 'Index'
    this.isDetail = this.$route.name === 'ArticleDetail'
  },

  watch: {
    '$route' (to, from) {
      this.isIndex = to.name === 'Index'
      this.isDetail = to.name === 'ArticleDetail'
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
  },

  mounted: function () {
    this.$nextTick(() => {
      this.clientHeight = document.body.clientHeight
      const el = document.getElementById('content-container')
      el.addEventListener('scroll', (e) => {
        this.showReturnTop = el.scrollTop > 300
      })
    })
  }
}
</script>

<style lang="less"  scoped>
  @import "../../style/base/base";
  .main-layout-structure-container {
    height: 100%;
    .main-layout-structure-topbar {
      position: absolute;
      width: 100%;
      z-index: 9;
    }
    .main-layout-structure-content {
      width: 100%;
      height: calc(100% - 1px);
      overflow-y: auto;
      padding-top: 43px;
    }
    .main-layout-structure-return-top {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-color: @theme-color;
      transition: opacity 1s;
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: @theme-background-color;
      &:hover {
        cursor: pointer;
        background-color: @hover-color;
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

  /*响应式布局开始*/
  @media screen and (max-width: 767px) {
    .return-top-pc {
      display: none !important;
    }
    .return-top-phone {
      display: block !important;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      .main-layout-structure-return-top-icon {
        padding-bottom: 5px;
        color: #ffffff;
        margin-top: 5px;
        margin-left: 5px;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .return-top-phone {
      display: none !important;
    }
    .return-top-pc, .return-top-pc2 {
      display: block !important;
      .main-layout-structure-return-top-text {
        font-size: 1.2em;
        color: @theme-color;
        &:hover {
          color: #ECFF8D;
        }
      }
    }
    .return-top-pc {
      background: url("../../assets/returnTop.png");
      background-color: #141414;
      padding: 45px 15px 0 15px;
      width: 60px;
      height: 100px;
    }
    .return-top-pc2 {
      padding: 8px 10px;
      border-radius: 50%;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
</style>
