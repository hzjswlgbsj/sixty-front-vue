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

    <article-info :article-data="article"/>

    <div class="article-info-cover" v-if="articleCoverImg && articleCoverImg.length > 0">
      <a class="article-info-cover-img" :style="coverImage" />
      <!-- <img class="article-info-cover-img"
           v-for="(image, index) in articleCoverImg"
           :key="index"
           :src="image.url" > -->
    </div>
    <div v-html="article.introduction" class="article-info-content" @click="goDetail(article.id)"></div>
    <div class="article-info-tags" v-if="article.tags && article.tags.length > 0">
      <!--<img class="article-info-tags-icon" src="../style/iconfont/tag.svg">
      <div class="article-info-tags-container" style="margin-left: 30px;">
        <a
        :style="currentId === tag.id ? tagHover : '' "
        v-for="tag in article.tags"
        :key="tag.id"
        @mouseover="curTagColor = tag.color;currentId = tag.id"
        @mouseout="curTagColor = '#a1a1a1'"
        @tag-click="tagClick(tag.id)">
          #{{tag.name}}
        </a>
      </div>-->

       <tag class="article-info-tag"
           v-for="tags in article.tags"
           :key="tags.id"
           :backgroundColor="tags.color"
           icon="ios-pricetag"
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
import ArticleInfo from './ArticleInfo'

export default {
  name: 'article-item',
  data () {
    return {
      sixtyLogo: SIXTY_LOGO,
      curTagColor: '',
      currentId: -1
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
    },
    tagHover () {
      return {
        color: this.curTagColor
      }
    }
  },
  components: {
    Tag,
    Avatar,
    ArticleInfo
  },
  methods: {
    goDetail (id) {
      this.$emit('go-detail', id)
    },
    tagClick (id) {
      alert('你点击了tag' + id)
      this.$router.push('/search')
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
      .article-title-text {
        position: relative;
        &:hover {
          cursor: pointer;
          color: $theme-color;
        }
        .article-title-tag {
          background-color: #5292DD;
          font-size: 0.5em;
          padding: 0 2px;
          border-radius: 2px;
          position: abasolute;
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
      position: relative;
      .article-info-tags-icon {
        width: 18px; height: 18px;
        position: absolute;
        top: 3px;
      }
      .article-info-tags-container {
        a {
          color: #a1a1a1;
          margin-right: 10px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  /*响应式布局开始*/
  @media screen and (max-width: 767px) {
    .article-info-cover-img {
      height: 200px !important;
    }
    .article-title {
      font-size: 20px !important;
    }
  }
</style>
