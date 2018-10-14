<template>
  <transition name="top-fade">
    <div v-if="isUp" class="topbar-container" :style="topBarStyle">
      <div class="topbar-inner-container">
        <div class="topbar-avatar-container">
          <avatar :src="sixtyLogo" size="22px"></avatar>
        </div>

        <div
          class="topbar-category-text"
          :style="topbarTitleStyle"
          v-if="menuList && menuList.length > 0"
          v-for="(menu, index) in menuList"
          :key="index"
          :class="currentIdx === index ? 'selected-item' : '' "
          @click="changePage(menu.key, index)">
          <transition
            enter-active-class='animated zoomIn'
            leave-active-class='animated zoomOut'>
            <div v-if="showTopbarTitle">{{menu.label}}</div>
          </transition>
        </div>

        <div v-if="showSearch" class="topbar-search-input-container">
          <!--<transition name="slide-fade">-->
          <Icon v-if="showSearchRecommend" class="topbar-search-input-icon" color="#fff" size="22" type="ios-search" />
          <input v-if="showSearchRecommend" v-focus class="topbar-search-input" type="text" placeholder="搜索 sixtyden.com">
          <!--</transition>-->
          <div class="topbar-search-input" v-if="!showSearchRecommend"> </div>

          <div ref="recommendModal" class="topbar-search-recommend-modal">
            <div style="height: 15px;">
              <transition name="slide-fade">
                <div v-show="showSearchRecommend" class="search-recommend-title">快速链接</div>
              </transition>
            </div>

            <ul class="search-recommend-list">
              <transition name="first-fade">
              <li v-if="showSearchRecommend">这里是推荐链接1</li>
              </transition>
              <transition name="second-fade">
                <li v-if="showSearchRecommend">这里是推荐链接2</li>
              </transition>
              <transition name="third-fade">
                <li v-if="showSearchRecommend">这里是推荐链接3</li>
              </transition>
              <transition name="fourth-fade">
                <li v-if="showSearchRecommend">这里是推荐链接4</li>
              </transition>
            </ul>
          </div>
        </div>

        <div class="topbar-search-icon" v-if="showTopbarTitle">
          <Icon type="ios-search" @click="handleSearch" size="18"/>
        </div>
        <div class="topbar-github-icon" v-if="showTopbarTitle">
          <a href="https://github.com/hzjswlgbsj" target="_blank">
            <Icon type="logo-github" size="18" />
          </a>
        </div>

        <div class="topbar-close-icon" v-if="!showTopbarTitle">
          <Icon type="ios-close" size="28"/>
        </div>

      </div>

      <!--<div v-if="showCollections" class="topbar-icon-collection-container" :style="iconCollectionStyle">-->
        <!--<icon-collection>-->
          <!--<div class="topbar-icon-collection" slot="sixty">-->
            <!--<avatar :src="sixtyLogo" type='square' size="17px" desc="Sixty"></avatar>-->
          <!--</div>-->
          <!--<div slot="music">-->
            <!--<avatar src="http://ovrjw2my5.bkt.clouddn.com/WYMusic.jpeg" type='square' size="17px" desc="music"></avatar>-->
          <!--</div>-->
        <!--</icon-collection>-->
      <!--</div>-->
    </div>
  </transition>
</template>

<script>
import Avatar from '../../components/Avatar'
import IconCollection from '../../components/IconCollection'
import dataStore from '../../data/index'
import { getScrollTop, getScrollHeight, getWindowHeight } from '../../util/scroll'
import routerMixin from '../../mixins/router'
import { SIXTY_LOGO } from '../../const'

export default {
  name: 'top-bar',

  components: {
    'avatar': Avatar,
    'icon-collection': IconCollection
  },

  props: {
    height: {
      type: String,
      default: '44px'
    },
    bgColor: {
      type: String,
      default: '#000000'
    },
    fontSize: {
      type: String,
      default: '14px'
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
      sixtyLogo: SIXTY_LOGO,
      curScrollTop: 0,
      isUp: true,
      isTop: true,
      isBottom: false,
      showSearch: false,
      showSearchRecommend: false,
      showTopbarTitle: true
    }
  },

  created () {
    this.currentIdx = dataStore.storage('curRouterIndex')
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
    topbarTitleStyle () {
      return this.showSearch ? {display: 'none'} : {}
    }
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },

  methods: {
    changePage (router, index) {
      this.jump(router)
      this.currentIdx = index
      dataStore.storage('curRouterIndex', index)
    },
    setExpression (min, max) {
      return window.scrollY > min && window.scrollY <= max
    },
    handleSearch () {
      this.showTopbarTitle = !this.showTopbarTitle
      if (this.showTopbarTitle) {
        this.showSearch = !this.showSearch
        this.showSearchRecommend = !this.showSearchRecommend
      } else {
        setTimeout(() => {
          this.showSearch = !this.showSearch
        }, 300)
        setTimeout(() => {
          this.showSearchRecommend = !this.showSearchRecommend
        }, 400)
      }
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
  },

  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('scroll', (e) => {
        this.isUp = this.curScrollTop > getScrollTop()
        this.isTop = getScrollTop() === 0
        this.isBottom = getScrollTop() + getWindowHeight() === getScrollHeight()
        this.curScrollTop = getScrollTop()
        this.setIconCoolOpacity()
      })

      /* 实现点击其他地方放选择标签的modal消失：
				 判断点击事件发生在区域外的条件是：
				 1.点击事件的对象不是目标区域本身
				 2.事件对象同时也不是目标区域的子元素
			*/
      document.addEventListener('click',  (e) => {
        let modal_event = this.$refs.recommendModal // 设置目标区域
        if (modal_event && !modal_event.isEqualNode(e.target) && !modal_event.contains(e.target)) {
          this.handleSearch()
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin/baseMixin";
  @import "../../style/base/base";
  .top-fade-enter-active {
    transition: all .8s ease;
  }
  .top-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .top-fade-enter, .top-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
  .topbar-container {
    padding: 0 180px;
    width: 100%;
    margin-top: 20px;
    z-index: $index-level-first;
    opacity: 0.95;
    @include flex-define (row, center, center);
    position: fixed;
    top: -20px;
    .topbar-inner-container {
      @include flex-define (row, space-around, center);
      width: 100%;
      max-width: 1100px;
      .topbar-avatar-container {
        padding-top: 5px;
      }
      .selected-item {
        color: $theme-color;
      }
      .topbar-category-text {
        /*margin-right: 20px;*/
        max-width: 584px;
        /*width: 80%;*/
        font-size: 14px;
        &:hover {
          color: $theme-color;
          cursor: pointer
        }
      }
      .topbar-search-input-container{
        width: 62%;
        position: relative;
        @include flex-define(row, center, center);
        .topbar-search-input-icon {
          margin-right: 10px;
          z-index: 2;
        }
        .topbar-search-input {
          font-size: 15px;
          color: #fff;
          width: 100%;
          height: 1.5em;
          background-color: #000000;
        }
        .topbar-search-recommend-modal {
          position: absolute;
          height: 200px;
          top: 33px;
          width: 100%;
          background-color: #ffffff;
          color: #333333;
          padding: 15px 10px;
          font-family: "SF Pro SC","HanHei SC","SF Pro Text","Myriad Set Pro","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
          .search-recommend-title {
            color: $font-other-color;
            font-size: 11px;
            margin-left: 20px;
          }
          .search-recommend-list {
            padding: 10px 0;
            li {
              list-style-type: none;
              cursor: pointer;
              padding: 4px 40px;
              margin-top: 4px;
              &:hover {
                background-color: #F2F2F2;
                color: $hover-color2;
              }
            }
          }
        }
        /* 可以设置不同的进入和离开动画 */
        /* 设置持续时间和动画函数 */
        .slide-fade-enter-active {
          transition: all .5s ease;
        }
        .slide-fade-enter {
          transform: translateX(30px);
          opacity: 0;
        }

        .first-fade-enter-active {
          transition: all 1s ease;
        }
        .first-fade-enter {
          transform: translateX(40px);
          opacity: 0;
        }

        .second-fade-enter-active {
          transition: all 1.4s ease;
        }
        .second-fade-enter {
          transform: translateX(40px);
          opacity: 0;
        }

        .third-fade-enter-active {
          transition: all 1.8s ease;
        }
        .third-fade-enter {
          transform: translateX(40px);
          opacity: 0;
        }

        .fourth-fade-enter-active {
          transition: all 2.2s ease;
        }
        .fourth-fade-enter {
          transform: translateX(40px);
          opacity: 0;
        }

      }
      .topbar-search-icon, .topbar-github-icon, .topbar-close-icon {
        cursor: pointer;
        &:hover {
          color: $theme-color;
        }
        a {
          color: $font-color;
          &:hover {
            color: $theme-color;
          }
        }
      }
      .topbar-icon-collection-container {
        position: fixed;
        top: 60px;
        right: 160px;
      }
    }
  }
</style>
