<template>
  <div class="topbar-container" :style="topBarStyle">
    <div class="topbar-avatar-container">
      <avatar src="http://ovrjw2my5.bkt.clouddn.com/80.jpg" size="60px"></avatar>
    </div>
    <div class="topbar-category-container" v-if="menuList && menuList.length > 0">
      <span v-for="(menu, index) in menuList"
        :key="index"
        :class="currentIdx === index ? 'selected-item' : '' "
        class="topbar-category-text"
        @click="changePage(menu.key, index)">
        {{menu.label}}
      </span>
    </div>
    <div v-if="showCollections" class="topbar-icon-collection-container" :style="iconCollectionStyle">
      <icon-collection>
        <div class="topbar-icon-collection" slot="sixty">
          <avatar src="http://ovrjw2my5.bkt.clouddn.com/80.jpg" type='square' size="17px" desc="Sixty"></avatar>
        </div>
        <div slot="music">
          <avatar src="http://ovrjw2my5.bkt.clouddn.com/WYMusic.jpeg" type='square' size="17px" desc="music"></avatar>
        </div>
      </icon-collection>
    </div>
  </div>
</template>

<script>
import Avatar from '../../components/Avatar'
import IconCollection from '../../components/IconCollection'
import dataStore from '../../data/index'
import routerMixin from '../../mixins/router'

export default {
  name: 'top-bar',
  props: {
    height: {
      type: String,
      default: '80px'
    },
    bgColor: {
      type: String,
      default: '#22354A'
    },
    fontSize: {
      type: String,
      default: '18px'
    },
    color: {
      type: String,
      default: '#f9f9f9'
    },
    opacity: {
      type: Number,
      default: 0.96
    }
  },
  mixins: [routerMixin],
  data () {
    return {
      iconCoolOpacity: 1,
      showCollections: true,
      currentIdx: -1,
      menuList: [
        {key: 'blog', label: 'Blog'},
        {key: 'tucao', label: 'Tocao'},
        {key: 'friend', label: 'Friends'},
        {key: 'resources', label: 'Resources'},
        {key: 'about', label: 'About'}
      ]
    }
  },
  components: {
    'avatar': Avatar,
    'icon-collection': IconCollection
  },
  created () {
    let lastRouterIdx = dataStore.storage('curRouterIdx')
    let currentRouter = this.$route.path.split('/')[1]
    if (lastRouterIdx !== undefined) {
      this.changePage(currentRouter, lastRouterIdx)
    }
  },
  computed: {
    topBarStyle () {
      return {
        height: this.height,
        color: this.color,
        'font-size': this.fontSize,
        'background-color': this.bgColor
      }
    },
    iconCollectionStyle () {
      return {
        opacity: this.iconCoolOpacity
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('scroll', (e) => {
        this.setIconCoolOpacity()
      })
    })
  },
  methods: {
    goDetail (id) {
      this.jump(`blog/articleDetail/${id}`)
    },
    changePage (router, index) {
      dataStore.store('curRouter', this.$route)
      dataStore.storage('curRouterIdx', index)
      this.$emit('jump-page', router)
      this.currentIdx = index
    },
    setExpression (min, max) {
      return window.scrollY > min && window.scrollY <= max
    },
    setIconCoolOpacity () {
      switch (true) {
        case this.setExpression(0, 75):
          this.iconCoolOpacity = 0.9
          this.showCollections = true
          break
        case this.setExpression(75, 150):
          this.iconCoolOpacity = 0.8
          this.showCollections = true
          break
        case this.setExpression(150, 225):
          this.iconCoolOpacity = 0.7
          this.showCollections = true
          break
        case this.setExpression(225, 300):
          this.iconCoolOpacity = 0.6
          this.showCollections = true
          break
        case this.setExpression(300, 375):
          this.iconCoolOpacity = 0.5
          this.showCollections = true
          break
        case this.setExpression(375, 450):
          this.iconCoolOpacity = 0.4
          this.showCollections = true
          break
        case this.setExpression(450, 525):
          this.iconCoolOpacity = 0.3
          this.showCollections = true
          break
        case this.setExpression(525, 600):
          this.iconCoolOpacity = 0.2
          this.showCollections = true
          break
        case this.setExpression(600, 675):
          this.iconCoolOpacity = 0.1
          this.showCollections = true
          break
        case window.scrollY > 675:
          this.iconCoolOpacity = 0
          this.showCollections = false
          break
        default:
          this.iconCoolOpacity = 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin/baseMixin";
  @import "../../style/base/base";
  .topbar-container {
    width: 100%;
    margin-top: 20px;
    z-index: $index-level-first;
    opacity: 0.95;
    @include flex-define (row, space-between, center);
    position: fixed;
    top: -20px;
    /*box-shadow: 0 1px 5px #495B64;*/
    .topbar-avatar-container {
      margin-left: 180px;
    }
    .topbar-category-container {
      margin-right: 60px;
      .selected-item {
        color: $theme-color;
      }
      .topbar-category-text {
        margin-right: 60px;
        &:hover {
          color: $theme-color;
          cursor: pointer
        }
      }
    }
    .topbar-icon-collection-container {
      position: fixed;
      top: 100px;
      right: 160px;
    }
  }
</style>
