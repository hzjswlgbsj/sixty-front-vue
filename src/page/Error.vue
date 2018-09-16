<template>
  <div class="error-root" :style="containerHeight">
    <div class="error-container">
      <h1 class="error-title">欢迎使用 Error 捕捉器</h1>
      <div class="error-title-desc">皮这一下你会很开心。</div>

      <div class="error-search-container">
        <Icon class= "error-search-icon" color="#666666" size="24" type="ios-search" />
        <input class="error-search-input" type="text" placeholder="搜索报错" />
      </div>

      <div class="error-search-desc">
        <p>
          这里是大蛇丸的实验室，在下追随蛇叔多年，这里是我一路走来收集的情报。
          嗯，在下认为我们在常年累月的修（kai）行（fa）过程中会遇到很多的error， 每次都要去百度或者google。
          假如我找个地方专门收集各种报错， 你只需要在这个板块来搜索就能得到解决问题的详细过程。
          听起来是不是很不错?
          本版块旨在记录解决各种问题的详细过程，既能帮助大家快速解决问题，又能学到东西！
        </p>
      </div>

    </div>
  </div>
</template>

<script>


export default {
  name: 'error',

  data () {
    return {
    }
  },

  created () {
    this.initData()
  },

  computed: {
    containerHeight () {
      let height = document.body.clientHeight
      return {
        'min-height': `${height}px`
      }
    }
  },
  methods: {
    async initData () {

    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin.scss";
  @import "../style/base/base";
  .error-root {
    @include flex-define(column, center, center);
    width: 100%;
    height: 100%;
    text-align: center;
    .error-container {
      width: 62%;
      max-width: 880px;
      font-size: 1.3em;
      color: $font-color;
      line-height: 2em;
      .error-title {
        font-size: 44px;
        font-weight: 400;
        margin-bottom: 30px;
      }
      .error-title-desc {
        font-size: 20px;
        margin: 20px 0;
      }
      .error-search-container {
        @include flex-define(row, center, center);
        width: 100%;
        height: 54px;
        margin-bottom: 60px;
        margin-top: 40px;
        .error-search-icon {
          margin-right: -35px;
          z-index: 2;
        }
        .error-search-input {
          max-width: 650px;
          width: 100%;
          height: 100%;
          border-radius: 2px;
          font-family: inherit;
          font-size: 24px;
          padding-left: 50px;
          padding-right: 30px;
        }
      }
      .error-search-desc {
        padding: 0 50px;
      }
    }
  }
</style>
