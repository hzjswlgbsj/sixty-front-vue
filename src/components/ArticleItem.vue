<template>
  <div class="article-container">
    <div class="article-author-avatar">
      <avatar :src="sixtyLogo" size="65px" rotate></avatar>
    </div>
    <div class="article-title">
      <span class="article-title-text" @click="goDetail(article.id)">
        {{article.title}}
        <span class="article-title-tag">原</span>
      </span>
    </div>
    <div class="article-info-container">
      <div>
        <span class="article-info-author">{{article.nickname}}</span>
      </div>
      <div>
        <span  class="article-info-date">&nbsp;&nbsp;•&nbsp;&nbsp;{{article.create_time}}</span>
      </div>
      <div>
        <icon class="article-info-address-icon" name="location-arrow" scale="1"></icon>
        <span class="article-info-address">南京&nbsp;•&nbsp;谷阳世纪大厦</span>
      </div>
    </div>
    <div class="article-info-cover" v-if="articleCoverImg && articleCoverImg.length > 0">
      <img class="article-info-cover-img"
           v-for="(image, index) in articleCoverImg"
           :key="index"
           :src="image.url" >
    </div>
    <div class="article-info-content" @click="goDetail(article.id)">
      {{article.introduction}}
    </div>
    <div class="article-info-tags" v-if="article.tags && article.tags.length > 0">
      <tag class="article-info-tag"
           v-for="tags in article.tags"
           :key="tags.id"
           :backgroundColor="tags.color"
           icon="pricetag"
           @tag-click="tagClick(tags.id)">
        {{tags.name}}
      </tag>
    </div>
  </div>
</template>

<script>
import Avatar from '../components/Avatar'
import Tag from '../components/Tag'
import { SIXTY_LOGO } from '../const'

export default {
  name: 'article-item',
  data () {
    return {
      sixtyLogo: SIXTY_LOGO
    }
  },
  props: {
    articleData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    article () {
      return this.articleData
    },
    articleCoverImg () {
      try {
        if (this.articleData['cover_picture']) {
          console.log(11111111, JSON.parse(this.articleData['cover_picture']))
          return JSON.parse(this.articleData['cover_picture'])
        }
        return []
      } catch (e) {
        console.log(e)
      }
    }
  },
  components: {
    'tag': Tag,
    'avatar': Avatar
  },
  methods: {
    goDetail (id) {
      this.$emit('go-detail', id)
    },
    tagClick (id) {
      alert('你点击了tag' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  @import "../style/base/base";
  .article-container {
    font-weight: 400;
    font-size: $font-size;
    .article-author-avatar {
      float: left;
      margin-right: 20px
    }
    .article-title {
      color: #ffffff;
      .article-title-text:hover {
        cursor: pointer;
        color: $base-color;
      }
      .article-title-text {
        font-size: 1.3em;
        position: relative;
        .article-title-tag {
          background-color: #5292DD;
          font-size: 0.5em;
          padding: 0 2px;
          border-radius: 2px;
          position: absolute;
          top: 2px;
          right: -20px;
          transition: All 0.6s ease-in-out;
          -webkit-transition: All 0.8s ease-in-out;
          -moz-transition: All 0.8s ease-in-out;
          -o-transition: All 0.8s ease-in-out;
          &:hover {
            color: #ffffff;
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
          }
        }
      }
    }
    .article-info-container {
      @include flex-define(row, start, center);
      margin-top: 5px;
      div {
        @include flex-define(row, space-between, center);
        &:hover {
          cursor: pointer;
        }
        .article-info-author {
          font-weight: 500;
          font-size: 1em;
        }
        .article-info-date, .article-info-address-icon, .article-info-address {
          color: $font-other-color;
        }
        .article-info-address-icon {
          margin-left: 20px;
        }
        .article-info-address {
          margin-left: 5px;
        }
      }
    }
    .article-info-cover{
      margin-top: 20px;
      width: 100%;
      height: 100%;
      .article-info-cover-img {
        width: auto;
        height: auto;
        max-width: 48%;
        max-height: 49%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    .article-info-content {
      text-indent: 2em;
      line-height: 1.8;
      color: $font-color;
      cursor: pointer;
    }
    .article-info-tags {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
