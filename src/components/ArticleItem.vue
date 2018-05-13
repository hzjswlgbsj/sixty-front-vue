<template>
  <div class="article-container">
    <div class="article-author-avatar">
      <avatar src="http://ovrjw2my5.bkt.clouddn.com/Bird.jpg" size="65px" rotate></avatar>
    </div>
    <div class="article-title">
      <span class="article-title-text" @click="goDetail(article.id)">
        {{article.title}}
        <span class="article-title-tag">原</span>
      </span>
    </div>
    <div class="article-info-container">
      <div>
        <icon name="user" scale="1.3"></icon>
        <span class="article-info-author">Sixty{{article.author}}</span>
      </div>
      <div>
        <icon name="comments" scale="1.3"></icon>
        <span class="article-info-comment">{{article.comment}} Comments</span>
      </div>
      <div>
        <icon name="eye" scale="1.3"></icon>
        <span class="article-info-view">{{article.views}} Views</span>
      </div>
      <div>
        <icon name="calendar" scale="1"></icon>
        <span  class="article-info-date">{{article.create_time}}</span>
      </div>
    </div>
    <div class="article-info-cover">
      <img v-if="article.image" class="article-info-cover-img" :src="article.image" >
    </div>
    <div class="article-info-content" @click="goDetail(article.id)">{{article.introduction}}</div>
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

export default {
  name: 'article-item',
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
      font-size: 28px;
      color: #ffffff;
      .article-title-text:hover {
        cursor: pointer;
        color: $base-color;
      }
      .article-title-text {
        position: relative;
        .article-title-tag {
          background-color: #5292DD;
          font-size: 12px;
          padding: 0 3px;
          border-radius: 2px;
          position: absolute;
          top: 5px;
          right: -25px;
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
      margin: 10px 0 20px 0;
      div {
        @include flex-define(row, space-between, center);
        margin-right: 15px;
        &:hover {
          cursor: pointer;
        }
        .article-info-author, .article-info-comment, .article-info-view, .article-info-date {
          margin-left: 5px;
          color: #ffffff;
        }
      }
    }
    .article-info-cover{
      width: 100%;
      height: 100%;
      .article-info-cover-img {
        width: 100%;
        height: 400px;
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
