<template>
  <div class="error-root" :style="containerHeight">
    <div class="error-container">
      <h1 class="error-title">欢迎使用 Error 捕捉器</h1>
      <div class="error-title-desc">皮这一下你会很开心。</div>

      <div class="error-search-container">
        <icon class="error-search-icon" name="search" scale="1.2" />
        <input class="error-search-input" type="text" placeholder="搜索报错" @keyup.enter="handleSearch($event)"/>
      </div>

      <div class="error-search-desc">
        <p>
          这里是大蛇丸的实验室，在下追随蛇叔多年，这里是我一路走来收集的情报。
          嗯，在下认为我们在常年累月的修（kāi）行（fā）过程中会遇到很多的error， 每次都要去百度或者google。
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
    // this.initData()
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
    async handleSearch (event) {
      this.$sixtyModal('敬请期待哦~')
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../style/mixin/baseMixin.less";
  @import "../style/base/base";
  .error-root {
    .flex-define(column, center, center);
    width: 100%;
    height: 100%;
    text-align: center;

    background-image: url(@errorCover);
    background-color: rgba(0, 0, 0, .6);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 70%;
    transition: opacity 1s;
    opacity: .8;

    .error-container {
      width: 62%;
      max-width: 880px;
      font-size: 1.3em;
      color: #ffffff;
      line-height: 2em;
      margin-top: 50px;
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
        .flex-define(row, center, center);
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

  @media screen and (max-width: 767px) {
    .error-container {
      width: 94% !important;
      .error-title {
        font-size: 30px !important;
      }
      .error-title-desc {
        font-size: 16px !important;
      }
      .error-search-container {
        height: 40px !important;
        width: 90% !important;
        margin-left: 7%;
        .error-search-input {
          font-size: 20px !important;
          margin-left: 10px !important;
          padding-left: 40px !important;

        }
        .error-search-icon {
          margin-right: -45px !important;
        }
      }
      .error-search-desc {
        padding: 0 20px !important;
      }
    }
  }
</style>
