<template>
  <div class="article-comment-page" v-if="pageTotal > 0">
    <div class="article-comment-page-total">共{{pageTotal}}页</div>
    <div class="article-comment-page-prev" v-if="currentPage > 1" @click="prev()">上一页</div>
    <div class="article-comment-page-list">
      <span class="article-comment-page-list-number" :class="currentPage === 1 ? currentPagerClasses : '' " @click="changePage(1)">1</span>
      <span v-if="currentPage > 4 && pageTotal !== 5" style="margin-right: 5px">...</span>
      <span
        class="article-comment-page-list-number"
        :class="currentPage === page ? currentPagerClasses : '' "
        v-for="(page, index) in paginationData"
        :key="index"
        @click="changePage(page)">
        {{page}}
      </span>
      <span v-if="pageTotal - currentPage > 3" style="margin-right: 5px">...</span>
      <span class="article-comment-page-list-number" v-if="pageTotal !== 1" :class="currentPage === pageTotal ? currentPagerClasses : '' " @click="changePage(pageTotal)">{{pageTotal}}</span>
    </div>
    <div class="article-comment-page-next" v-if="currentPage !== pageTotal" @click="next()">下一页</div>
  </div>
  <div v-else>暂无吐槽</div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 5
    },
    current: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      currentPage: this.current,
      currentPageSize: this.pageSize
    }
  },
  watch: {
    total (val) {
      let maxPage = Math.ceil(val / this.currentPageSize)
      if (maxPage < this.currentPage && maxPage > 0) {
        this.currentPage = maxPage
      }
    },
    current (val) {
      this.currentPage = val
    },
    pageSize (val) {
      this.currentPageSize = val
    }
  },
  computed: {
    pageTotal () {
      if (this.total === 0) {
        return 0
      }
      const allPage = Math.ceil(this.total / this.currentPageSize)
      return (allPage === 0) ? 1 : allPage
    },
    paginationData () {
      let pageMiddle = [] // 分页省略号中间的页码的数组
      if (this.pageTotal === 2) {
        return []
      }
      for (let i = 2, len = this.pageTotal; i < len; i++) {
        pageMiddle.push(i)
      }
      return pageMiddle
    },
    currentPagerClasses () {
      return 'article-comment-page-list-current'
    }
  },
  methods: {
    changePage (page) {
      if (this.currentPage !== page) {
        this.currentPage = page
        this.$emit('on-change', page)
      }
    },
    prev () {
      const current = this.currentPage
      if (current <= 1) {
        return false
      }
      this.changePage(current - 1)
    },
    next () {
      const current = this.currentPage
      if (current >= this.allPages) {
        return false
      }
      this.changePage(current + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  @import "../style/base/base";
  .article-comment-page {
    height: 40px;
    @include flex-define(row, start, center);
    .article-comment-page-total {
      margin-right: 10px;
    }
    .article-comment-page-prev, .article-comment-page-next {
      @include cursor-hover-color;
    }
    .article-comment-page-list {
      margin: 0 10px;
      .article-comment-page-list-number {
        margin-right: 5px;
        @include cursor-hover-color;
      }
      .article-comment-page-list-current {
        color: $theme-color;
      }
    }
  }
</style>
