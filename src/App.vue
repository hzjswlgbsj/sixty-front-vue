<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import '../src/style/base/base.scss';
  html,body,#app {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: $theme-background-color;
    font-family: $font-family;
  }
  body {
    // margin-top: -21px;
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: none;
    // color: #ffffff !important;
  }
  /* 对markdown插件的border样式覆盖 */
  .highlight pre,
  .markdown-body pre {
    padding: 0 !important;
    border: none !important;
    font-size: 1.2em !important;
  }

  .hljs {
    padding: 1em !important;
    border-radius: 10px;
  }
  .v-show-content, .scroll-style {
    padding: 0 !important;
    color: #DAE1E8 !important;
    background-color: #1A2936 !important;
  }
  .v-show-content pre {
    background-color: #1A2936 !important;
  }
  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
    border: none !important;
  }

  .markdown-body ol {
    list-style: decimal !important;
  }

  .markdown-body li {
    list-style: decimal !important;
  }
</style>
