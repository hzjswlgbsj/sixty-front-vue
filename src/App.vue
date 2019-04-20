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
  html, body, #app {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: $theme-background-color;
    font-family: $font-family;
    color: $font-color;
  }
  body {
    // margin-top: -21px;
    width: 100%;
    height: 100%;
  }
  input,button,select,textarea {
    outline:none;
    border: none
  }
  li {
    list-style:none;
  }
  .markdown-body a {
    text-decoration: none;
    color: $font-color3!important;
    font-weight: 600;
  }
  code {
    color: #e96900;
    background-color: #F8F8F8 !important;
  }
  /* 对markdown插件的border样式覆盖 */
  .highlight pre,
  .markdown-body pre {
    padding: 0 !important;
    border: none !important;
    font-size: 1.2em !important;
  }

  .markdown-body hr {
    background-color: #333!important;
    height: 0.05em !important;
    margin: -10px 0 25px 0 !important;
  }

  h1, h2, h3 {
    /*border-bottom: 1px solid #dddddd !important;*/
    border: none !important;
    /*color: #2F3D4F;*/
    padding-bottom: 20px !important;
  }

  .hljs {
    padding: 1em !important;
    background-color: #F8F8F8 !important;
    code {
      color: #525252 !important;
    }
  }
  .v-show-content, .scroll-style {
    padding: 0 !important;
    color: #394A5D !important;
    background-color: #ffffff !important;
  }
  .comment-parent-content-text pre {
    background-color: #282C34 !important;
    padding: 5px 16px;
    border-radius: 5px;
  }
  .v-show-content pre {
    background-color: $theme-background-color !important;
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
  .markdown-body table tr {
    background-color: #282C34!important;
    border-top: 1px solid #000!important;
  }
  .markdown-body table td, .markdown-body table th {
    border: 1px solid #000!important;
  }
</style>
