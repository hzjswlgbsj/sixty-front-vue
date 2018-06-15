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
    margin-top: -21px;
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: #ffffff;
  }
</style>
