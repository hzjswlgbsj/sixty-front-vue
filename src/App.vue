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

<style>
  html,body,#app {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #1F292B;
  }
  body {
    margin-top: -21px;
  }
  a {
    text-decoration: none;
    color: #ffffff;
  }
</style>
