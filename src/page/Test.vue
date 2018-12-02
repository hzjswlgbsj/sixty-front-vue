<template>
  <div id="app">
    <full-page :options="options" id="fullpage" ref="fullpage">
      <div class="section">
        <h3>page1</h3>
      </div>
      <div class="section">
        <h3>page2</h3>
      </div>
      <div class="section">
        <h3>page3</h3>
      </div>
    </full-page>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      options: {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        navigation: true,
        navigationPosition: 'right',
        // anchors: ['page1', 'page2', 'page3'],
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
      }
    }
  }
}
</script>

<style>

</style>
