<template>
  <div class="article-info-container">
    <div>
      <icon name="at" scale="0.8"></icon>
      <span class="article-info-author">{{article.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>
    <div>
      <icon name="terminal" scale="0.8"></icon>
      <span class="article-info-date"> 发表于 <timeago :datetime="article.create_time" :auto-update="60"/>>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>
    <div>
      <icon name="location-arrow" scale="0.8"></icon>
      <span class="article-info-address">南京&nbsp;•&nbsp;谷阳世纪大厦</span>
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
    div {
      @include flex-define(row, space-between, center);
      cursor: pointer;
      .article-info-author, .article-info-date, .article-info-address {
        color: $font-title-color;
        margin-left: 5px;
        &:hover {
            color: #2BBC8A;
        }
      }
    }
  }
</style>
