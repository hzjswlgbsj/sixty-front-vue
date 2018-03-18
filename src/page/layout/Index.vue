<template>
  <div class="main-layout-structure-container" :style="mainLayout">
    <div v-if="!isIndex" class="main-layout-structure-topbar">
      <top-bar bgColor="#20292B" @jump-page="changePage"></top-bar>
    </div>
    <div class="main-layout-structure-introduction">
      <introduction v-if="isIndex"></introduction>
      <router-view></router-view>
    </div>
    <div v-if="!isIndex" class="main-layout-structure-footbar">
      <foot-bar></foot-bar>
    </div>
    <div v-if="showReturnTop" @click="returnTop" class="main-layout-structure-return-top">
      <icon name="github-square" scale="4"></icon>
    </div>
  </div>
</template>

<script>
import TopBar from './TopBar'
import FootBar from './FootBar'
import Introduction from './Introduction'
import dataStore from '../../data/index'
import routerMixin from '../../mixins/router'

export default {
  name: 'index',
  data () {
    return {
      isIndex: true,
      clientHeight: '',
      showReturnTop: false
    }
  },
  created () {
    dataStore.store('curRouter', this.$route)
    let curRouterObj = dataStore.store('curRouter')
    this.isIndex = curRouterObj.name === 'Index'
  },
  mixins: [routerMixin],
  components: {
    'top-bar': TopBar,
    'foot-bar': FootBar,
    'introduction': Introduction
  },
  watch: {
    '$route' (to, from) {
      dataStore.store('curRouter', to)
      let curRouterObj = dataStore.store('curRouter')
      this.isIndex = curRouterObj.name === 'Index'
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
    changePage (router) {
      this.jump(router)
    },
    returnTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="scss"  scoped>
  .main-layout-structure-container {
    margin-top: 20px;
    .main-layout-structure-introduction {
      width: 100%;
      height: 100%;
    }
    .main-layout-structure-return-top {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: fixed;
      bottom: 20px;
      right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
