<template>
  <div class="search-root">
    <div class="search-container">
      <div class="search-tag-title">
        <div class="search-tag-title-header">
          <h1 v-if="searchParams.type === 'tag' ">标签目录：#{{ this.searchKeyWords }}</h1>
          <div v-else class="search-tag-title-header-normal">
            <Input v-model="searchKeyWords"
                   icon="ios-search"
                   placeholder="Enter something..."
                   @on-enter="handleSearch"
                   clearable style="width: 200px" />
          </div>

          <div class="search-tag-title-desc">以下是与"{{ this.searchKeyWords }}"相关联的文章，共{{searchData.total}}条结果</div>
        </div>
        <div class="search-tag-list-container">
          <div class="search-tag-list-none" v-if="searchData.items && searchData.items.length === 0">没有搜到任何结果哦，要不尝试其他搜索词吧。</div>
          <div class="search-tag-list" v-else>
            <div class="search-tag-item" v-for="article in searchData.items" :key="article.id">
              <a class="search-tag-item-title" :href=" `/blog/articleDetail/${article.id}` ">{{ article.title }}</a>
              <div class="article-info">{{ article.introduction }}</div>
              <a class="search-tag-item-link" :href=" `/blog/articleDetail/${article.id}` ">http://www.sixtyden.com/blog/articleDetail/{{ article.id }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remoteFilterArticles, getTagsByIds } from '../service/article'

export default {
  name: 'Search',
  data () {
    return {
      searchData: {},
      searchKeyWords: ''
    }
  },

  props: {
    query: {
      type: String,
      default: ''
    }
  },

  created () {
    this.initSearchData()
  },

  computed: {
    searchParams () {
      return JSON.parse(this.query)
    }
  },

  watch: {
    '$route' (to, from) {
      let searchParams = JSON.parse(to.query.q)
      this.searchKeyWords = searchParams.keywords
      this.initSearchData(this.searchKeyWords)
    }
  },

  methods: {
    async initSearchData (keywords) {
      let filter = {}

      if (this.searchParams.type === 'tag') {
        filter.tagId = this.searchParams.tagId
        await this.initTag()
      }

      if (this.searchParams.type === 'normal') {
        if (keywords) this.searchKeyWords = keywords
        filter.keywords = this.searchKeyWords
      }

      this.searchData = await remoteFilterArticles(filter)
    },
    async initTag () {
      let tags = await getTagsByIds([this.searchParams.tagId])
      this.searchKeyWords = tags[0].name
    },
    handleSearch () {
      if (this.searchKeyWords === '') return
      this.$router.push(`/search?q=${JSON.stringify({
        keywords: this.searchKeyWords,
        type: 'normal'
      })}`)
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .search-root {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
    height: 100%;
    min-height: 800px;
    .search-container {
      width: 62%;
      max-width: 880px;
      font-size: $font-size;
      .search-tag-title {
        .search-tag-title-header {
          border-bottom: 1px solid #666666;
          padding-bottom: 5px;
          .search-tag-title-desc {
            margin-top: 20px;
          }
        }
        .search-tag-list-container {
          .search-tag-list-none {
            margin-top: 20px;
            font-weight: 500;
          }
          .search-tag-list {
            .search-tag-item {
              margin-top: 40px;
              .search-tag-item-title {
                font-size: 1.4em;
                font-weight: 500;
                color: #ffffff;
                &:hover {
                  text-decoration: none;
                  color: #5293D4;
                }
              }
              .article-info {
                padding: 5px 0;
              }
              .search-tag-item-link {
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .search-container {
      width: 94% !important;
    }
  }
</style>
