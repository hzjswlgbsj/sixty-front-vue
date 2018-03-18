<template>
  <div class="article-container">
    <div class="article-author-avatar">
      <avatar src="http://ovrjw2my5.bkt.clouddn.com/Bird.jpg" size="70px" rotate></avatar>
    </div>
    <div class="article-title">
      <span class="article-title-text" @click="goDetail(articleData.id)">{{articleData.title}}</span>
    </div>
    <div class="article-info-container">
      <div>
        <icon name="user" scale="1.3"></icon>
        <span class="article-info-author">{{articleData.author}}</span>
      </div>
      <div>
        <icon name="comments" scale="1.3"></icon>
        <span class="article-info-comment">{{articleData.comment}} Comments</span>
      </div>
      <div>
        <icon name="eye" scale="1.3"></icon>
        <span class="article-info-view">{{articleData.views}} Views</span>
      </div>
      <div>
        <icon name="calendar" scale="1"></icon>
        <span  class="article-info-date">{{articleData.creat_date}}</span>
      </div>
    </div>
    <div class="article-info-cover">
      <img v-if="articleData.image" class="article-info-cover-img" :src="articleData.image" >
    </div>
    <div class="article-info-content" @click="goDetail(articleData.id)">{{articleData.introduction}}</div>
    <div class="article-info-tags">
      <tag color="blue" backgroundColor="#46C47C">美食</tag>
      <tag color="blue">美女</tag>
      <tag color="blue" backgroundColor="#FF9800">最美成都</tag>
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
  components: {
    'tag': Tag,
    'avatar': Avatar
  },
  methods: {
    goDetail (id) {
      this.$emit('go-detail', id)
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
      &:hover {
        cursor: pointer;
      }
    }
    .article-info-tags {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
