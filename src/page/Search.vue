<template>
  <div class="search-root">
    <div class="search-container">
      这里是搜索结果
      <div class="search-tag-result"></div>
    </div>
  </div>
</template>

<script>
import { remoteFilterArticles } from '../service/article'
export default {
  name: 'Search',
  data () {
    return {
      searchData: []
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
        tagId: this.searchParams.data
      }
      this.searchData = await remoteFilterArticles(filter)
      console.log(11111, this.searchData)
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
    .search-container {
      width: 62%;
      max-width: 880px;
      font-size: $font-size;
    }
  }

  @media screen and (max-width: 767px) {
    .search-container {
      width: 94% !important;
    }
  }
</style>
