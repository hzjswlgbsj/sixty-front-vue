<template>
  <div class="blog-container">
    <div class="blog-article-container" v-if="!isDetail">
      <div class="blog-article-item" v-for="(article, index) in articleData" :key="index">
        <article-item :articleData="article" @go-detail="goDetail"></article-item>
      </div>
    </div>
    <div v-else class="blog-article-detail-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopBar from './layout/TopBar'
import FootBar from './layout/FootBar'
import ArticleItem from '../components/ArticleItem'
import routerMixin from '../mixins/router'
import dataStore from '../../src/data/index'
import articleApi from '../api/article'

export default {
  name: 'blog',
  data () {
    return {
      isDetail: false,
      articleData: []
    }
  },
  mixins: [routerMixin],
  components: {
    'top-bar': TopBar,
    'foot-bar': FootBar,
    'article-item': ArticleItem
  },
  created () {
    this.initData()
  },
  watch: {
    '$route' (to, from) {
      dataStore.store('curRouter', to)
      let curRouterObj = dataStore.store('curRouter')
      this.isDetail = curRouterObj.name === 'ArticleDetail'
    }
  },
  methods: {
    async initData () {
      dataStore.store('curRouter', this.$route)
      let curRouterObj = dataStore.store('curRouter')
      this.isDetail = curRouterObj.name === 'ArticleDetail'
      // get article data
      try {
        let articles = await articleApi.all()
        if (articles && articles.length > 0) {
          this.articleData = articles
        }
      } catch (e) {
        console.log(e)
      }
    },
    goDetail (id) {
      this.jump(`blog/articleDetail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  .blog-container {
    height: 100%;
    .blog-article-container {
      margin-top: 180px;
      @include flex-define (column, center, center);
      .blog-article-item {
        color: #f9f9f9;
        border-bottom: 2px solid #666666;
        padding-bottom: 20px;
        margin-bottom: 30px;
        min-width: 880px;
        width: 62%;
        &:hover {
          border-bottom: 2px solid #cccccc;
        }
      }
    }
    .blog-article-detail-container {
      margin-top: 140px;
    }
  }
</style>
