<template>
  <div class="article-info-container">
    <div class="article-info">
      <icon name="at" scale="0.8"></icon>
      <span class="article-info-author icon">{{article.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

    <div class="article-info">
      <icon name="comments" scale="0.8"></icon>
      <span class="article-info-comment icon">23 comments&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

    <div class="article-info">
      <icon name="terminal" scale="0.8"></icon>
      <span class="article-info-date icon"><timeago :datetime="article.create_time" :auto-update="60"/>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

    <div class="article-info article-info-address">
      <icon name="location-arrow" scale="0.8"></icon>
      <span class="article-info-address icon">南京&nbsp;•&nbsp;谷阳世纪大厦</span>
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

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  @import "../style/base/base";
  .article-info-container {
    @include flex-define(row, center, center);
    margin: 25px 0;
    font-size: 0.9em;
    color: $font-other-color;
    .article-info {
      @include flex-define(row, space-between, center);
      cursor: pointer;
      &:hover {
        color: $theme-color;
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
