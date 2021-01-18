<template>
  <div class="article-info-container">
    <div class="article-info">
      <icon name="at" scale="0.8"></icon>
      <span class="article-info-author icon">{{article.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

    <div class="article-info">
      <icon name="comments" scale="0.8"></icon>
      <span class="article-info-comment icon">{{article.comment}} comments&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

    <div class="article-info">
      <icon name="terminal" scale="0.8"></icon>
      <span class="article-info-date icon"><timeago :datetime="article.create_time" :auto-update="60"/>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

    <div class="article-info article-info-address">
      <icon name="location-arrow" scale="0.8"></icon>
      <span class="article-info-address icon" v-if="article.location">{{ article.location }}</span>
      <span class="article-info-address icon" v-else>作者屏蔽了位置</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-info',
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
  }
}
</script>

<style lang="less" scoped>
  @import "../style/mixin/baseMixin.less";
  @import "../style/base/base.less";
  .article-info-container {
    .flex-define(row, center, center);
    margin: 25px 0;
    font-size: 0.9em;
    /*color: @font-color2;*/
    .article-info {
      .flex-define(row, space-between, center);
      cursor: pointer;
      &:hover {
        color: @theme-color;
      }
      .icon {
        margin-left: 5px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .article-info-address {
      display: none !important;
    }
  }
</style>
