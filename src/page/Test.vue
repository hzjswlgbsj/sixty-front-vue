<template>
  <div class="full-page-root">
    <full-page :options="options" id="fullPage" ref="fullPage">
      <div class="section" v-for="item in testData">
        <h3>{{item.text}}</h3>
      </div>
    </full-page>

    <div class="full-page-pagination">
      <div class="full-page-pagination-circle">
        <div class="full-page-pagination-point"></div>
      </div>
      <div class="full-page-pagination-circle">
        <div class="full-page-pagination-point page-pagination-hover"></div>
      </div>
      <div class="full-page-pagination-circle">
        <div class="full-page-pagination-point page-pagination-active"></div>
      </div>
    </div>
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
      },
      testData: [
        {id: 1, text: 'page1'},
        {id: 2, text: 'page2'},
        {id: 3, text: 'page3'},
        {id: 4, text: 'page4'},
        {id: 5, text: 'page5'}
      ]
    }
  }
}
</script>

<style lang="scss">
  .full-page-root {
    position: relative;
    height: 100%;
    .full-page-pagination {
      position: fixed;
      top: 50%;
      right: 0;
      .full-page-pagination-circle {
        display: flex;
        width: 15px;
        height: 15px;
        margin: 10px;
        position: relative;
        cursor: pointer;
        justify-content: center;
        align-content: center;
        .full-page-pagination-point {
          background-color: #333333;
          border-radius: 50%;
          width: 4px;
          height: 4px;
        }
      }
    }
    .page-pagination-hover {
      width: 8px !important;
      height: 8px !important;
      margin-left: 1.5px;
    }
    .page-pagination-active {
      width: 12px !important;
      height: 12px !important;
      margin-left: 2px;
    }
  }
</style>
