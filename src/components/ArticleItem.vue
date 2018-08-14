<template>
  <div class="article-container">
    <!-- <div class="article-author-avatar">
      <avatar :src="sixtyLogo" size="65px" rotate></avatar>
    </div> -->
    <div class="article-title">
      <span class="article-title-text" @click="goDetail(article.id)">
        {{article.title}}
        <!-- <span class="article-title-tag">原</span> -->
      </span>
    </div>
    <div class="article-info-container">
      <div>
        <span class="article-info-author">@ {{article.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <div>
        <icon name="terminal" scale="0.8"></icon>
        <span class="article-info-date"> 发表于<timeago :datetime="article.create_time" :auto-update="60" />&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <div>
        <icon class="article-info-address-icon" name="location-arrow" scale="0.8"></icon>
        <span class="article-info-address">南京&nbsp;•&nbsp;谷阳世纪大厦</span>
      </div>
    </div>
    <div class="article-info-cover" v-if="articleCoverImg && articleCoverImg.length > 0">
      <a class="article-info-cover-img" :style="coverImage" />
      <!-- <img class="article-info-cover-img"
           v-for="(image, index) in articleCoverImg"
           :key="index"
           :src="image.url" > -->
    </div>
    <div class="article-info-content" @click="goDetail(article.id)">
      {{article.introduction}}
    </div>
    <div class="article-info-tags" v-if="article.tags && article.tags.length > 0">
      <!-- <span
      v-for="tags in article.tags"
      :key="tags.id"
      :backgroundColor="tags.color"
      @tag-click="tagClick(tags.id)">
      # {{tags.name}} &nbsp;&nbsp;
      </span> -->
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
          return JSON.parse(this.articleData['cover_picture'])
        }
        return []
      } catch (e) {
        console.log(e)
      }
    },
    coverImage () {
      return {
        backgroundImage: `url(${this.articleCoverImg[0].url})`
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
    text-align: center;
    font-size: $font-size;
    .article-author-avatar {
      float: left;
      margin-right: 20px
    }
    .article-title {
      color: $font-title-color;
      font-size: $font-size-title;
      .article-title-text:hover {
        cursor: pointer;
        color: $base-color;
      }
      .article-title-text {
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
            color: $font-color;
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
      @include flex-define(row, center, center);
      margin: 25px 0;
      font-size: 0.9em;
      div {
        @include flex-define(row, space-between, center);
        cursor: pointer;
        .article-info-author, .article-info-date, .article-info-address-icon, .article-info-address {
          color: $font-title-color;
        }
        .article-info-address, .article-info-date {
          margin-left: 5px;
        }
      }
    }
    .article-info-cover{
      margin-top: 20px;
      width: 100%;
      height: 100%;
      .article-info-cover-img {
        height: 400px;
        border-radius: 5px;
        margin-bottom: 30px;
        display: block;
        background-color: rgba(0,0,0,0.02);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .article-info-content {
      text-indent: 2em;
      line-height: 2em;
      color: $font-color;
      cursor: pointer;
      text-align: left;
    }
    .article-info-tags {
      text-align: left;
      margin-top: 20px;
      margin-bottom: 20px;
      // color: $font-other-color;
    }
  }
</style>
