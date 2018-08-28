<template>
  <div class="blog-container" :style="containerHeight">
    <div class="blog-article-container" v-if="!isDetail">
      <div class="blog-article-item" v-for="article in articleData" :key="article.id">
        <article-item :articleData="article" @go-detail="goDetail"></article-item>
      </div>
      <div class="blog-article-item-more">
        <vue-loading
          v-if="!notAnyMare && articleData && articleData.length > 0"
          type="bubbles"
          color="#2BBC8A"
          :size="{ width: '50px', height: '50px' }" />
        <span class="blog-article-item-more-title" v-if="notAnyMare">
          -- 再拉，肠子都被你拉出来了(゜-゜) --
        </span>
      </div>
    </div>
    <div v-else class="blog-article-detail-container">
      <router-view></router-view>
    </div>

    <vue-loading
      v-if="!articleData || articleData.length === 0"
      type="bubbles"
      color="#2BBC8A"
      :size="{ width: '50px', height: '50px' }" />
  </div>
</template>

<script>
import TopBar from './layout/TopBar'
import FootBar from './layout/FootBar'
import ArticleItem from '../components/ArticleItem'
import routerMixin from '../mixins/router'
import dataStore from '../../src/data/index'
import { remoteGetArticles } from '../service/article'
import { getScrollTop, getScrollHeight, getWindowHeight } from '../util/scroll'

export default {
  name: 'blog',
  data () {
    return {
      isDetail: false,
      tags: [],
      currentArticlePage: 1,
      isBottom: false
    }
  },
  mixins: [routerMixin],
  components: {
    'top-bar': TopBar,
    'foot-bar': FootBar,
    'article-item': ArticleItem
  },
  created () {
    this.init()
  },
  computed: {
    articleData () {
      return dataStore.store('articles')
    },
    notAnyMare () {
      return dataStore.store('notAnyMareArticle')
    },
    containerHeight () {
      let height = document.body.clientHeight
      return {
        'min-height': `${height}px`
      }
    }
  },
  watch: {
    '$route' (to, from) {
      dataStore.store('curRouter', to)
      let curRouterObj = dataStore.store('curRouter')
      this.isDetail = curRouterObj.name === 'ArticleDetail'
    },
    isBottom (val) {
      if (val && !this.isDetail && !this.notAnyMare) {
        this.handleLoadMore()
      }
    }
  },
  methods: {
    async init () {
      dataStore.store('curRouter', this.$route)
      let curRouterObj = dataStore.store('curRouter')
      this.isDetail = curRouterObj.name === 'ArticleDetail'
      this.initArticleData() // Initialize article data and set store
    },
    async initArticleData () {
      try {
        await remoteGetArticles()
      } catch (e) {
        console.log(e)
      }
    },
    async articleLoadMore () {
      this.currentArticlePage++
      try {
        await remoteGetArticles(true, null, this.currentArticlePage)
      } catch (e) {
        console.log(e)
      }
    },
    goDetail (id) {
      this.jump(`blog/articleDetail/${id}`)
    },
    async handleLoadMore () {
      await this.articleLoadMore()
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('scroll', (e) => {
        this.isBottom = getScrollTop() + getWindowHeight() === getScrollHeight()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  .blog-container {
    height: 100%;
    .blog-article-container {
      margin-top: 120px;
      @include flex-define (column, center, center);
      .blog-article-item {
        color: #f9f9f9;
        border-bottom: 1px solid $common-line-color;
        margin-bottom: 30px;
        width: 62%;
        max-width: 880px;
        padding: 10px 10px 20px 10px;
        &:hover {
          // background-color: #22354A;
          padding: 10px 10px 20px 10px;
          border-radius: 5px;
        }
        @include keyframes(articleSpin) {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .blog-article-item-load {
          animation: articleSpin 1s linear infinite;
          -moz-animation: articleSpin 7s linear infinite;
          -webkit-animation: articleSpin 7s linear infinite;
          -o-animation: articleSpin 7s linear infinite;
        }
      }
      .blog-article-item-more {
        padding: 10px 60px;
        -webkit-transition:.8s ease-in-out;
        -moz-transition:.8s ease-in-out;
        .blog-article-item-more-title {
          font-size: $font-size;
        }
      }
    }
    .blog-article-detail-container {
      margin-top: 140px;
    }
  }
</style>
