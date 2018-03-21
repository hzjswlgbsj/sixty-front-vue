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
import tagsApi from '../api/tags'
import articleMixin from '../mixins/article'

export default {
  name: 'blog',
  data () {
    return {
      isDetail: false,
      articleData: [],
      tags: []
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
  watch: {
    '$route' (to, from) {
      dataStore.store('curRouter', to)
      let curRouterObj = dataStore.store('curRouter')
      this.isDetail = curRouterObj.name === 'ArticleDetail'
    }
  },
  methods: {
    async init () {
      dataStore.store('curRouter', this.$route)
      let curRouterObj = dataStore.store('curRouter')
      this.isDetail = curRouterObj.name === 'ArticleDetail'
      this.getArticle() // Initialize article data and set store
      this.getArticleTagsById() // Initialize articleTags data and set store
    },
    async getArticle () {
      try {
        let articles = await articleApi.all()
        if (articles && articles.length > 0) {
          dataStore.store('articles', articles) // 初始化store里面的文章数据
          dataStore.storage('articles', articles) // 初始化localstorage里面的文章数据
          let allArticles = dataStore.store('articles') // 此处可以深拷贝出来再修改，然后再存到store，可以用lodash，本项目小博客我就不引用那么多东西了
          for (let article of allArticles) {
            let tagIds = article.tag_ids && article.tag_ids.split(',')
            article.tags = articleMixin.getTagsByIds(tagIds)
          }
          this.articleData = articles
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getArticleTagsById () {
      try {
        let tags = await tagsApi.all()
        if (tags && tags.length > 0) {
          dataStore.store('article_tags', tags) // 初始化store里面的标签数据
          dataStore.storage('article_tags', tags) // 初始化localstorage里面的标签数据
          this.tags = dataStore.store('article_tags')
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
