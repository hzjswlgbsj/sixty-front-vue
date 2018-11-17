<template>
  <div class="search-root">
    <div class="search-container">
      <!--search for tag start-->
      <div class="search-tag-title" v-if="searchParams.type === 'tag' ">
        <div class="search-tag-title-header">
          <h1>标签目录：#{{ this.searchTag.name }}</h1>
          <div class="search-tag-title-desc">以下是与标签"{{ this.searchTag.name }}"相关联的文章，共{{searchData.total}}条结果</div>
        </div>

        <div class="search-tag-list-container">
          <div class="search-tag-list-none" v-if="searchData.items && searchData.items.length === 0">暂无数据哦</div>
          <div class="search-tag-list" v-else>
            <div class="search-tag-item" v-for="article in searchData.items" :key="article.id">
              <a class="search-tag-item-title" :href=" `http://www.sixtyden.com/blog/articleDetail/${article.id}` ">{{ article.title }}</a>
              <div class="article-info">{{ article.introduction }}</div>
              <a class="search-tag-item-link" :href=" `http://www.sixtyden.com/blog/articleDetail/${article.id}` ">http://www.sixtyden.com/blog/articleDetail/{{ article.id }}</a>
            </div>
          </div>
        </div>
      </div>
      <!--search for tag end-->
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
      searchTag: {}
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

  methods: {
    async initSearchData () {
      let filter = {
        tagId: this.searchParams.tagId
      }
      this.searchData = await remoteFilterArticles(filter)
      if (this.searchParams.type === 'tag') await this.initTag()
    },
    async initTag () {
      let tags = await getTagsByIds([this.searchParams.tagId])
      this.searchTag = tags[0]
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
