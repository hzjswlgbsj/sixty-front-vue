<template>
  <div class="full-page-root">
    <full-page :options="options" id="fullPage" ref="fullPage">
      <div class="section" :key="item.id" v-for="item in testData">
        <h3>{{item.text}}</h3>
      </div>
    </full-page>

    <div class="full-page-pagination">
      <div
        class="full-page-pagination-circle"
        v-for="(data, index) in testData"
        :key="index">
        <div
          :style="paginationStyle(index)"
          class="full-page-pagination-point"
          @click.self="paginationClick(index)"
          @mouseout.self="paginationOut"
          @mouseover.self="paginationHover(index)">
        </div>
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
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab'],
        afterLoad: this.afterLoad
      },
      testData: [
        {id: 1, text: 'page1'},
        {id: 2, text: 'page2'},
        {id: 3, text: 'page3'},
        {id: 4, text: 'page4'},
        {id: 5, text: 'page5'}
      ],
      curSelectIndex: 0,
      curActiveIndex: -1
    }
  },
  methods: {
    afterLoad (origin, destination, direction) {
      // console.log('---------------------------------')
      // console.log('origin', origin)
      // console.log('destination', destination)
      // console.log('direction', direction)
      // console.log('---------------------------------')
      this.curSelectIndex = destination.index
    },
    paginationClick (index) {
      this.curSelectIndex = index
      this.$refs.fullPage.api.moveTo(index + 1)
    },
    paginationOut () {
      this.curActiveIndex = -1
    },
    paginationHover (index) {
      this.curActiveIndex = index
    },
    paginationStyle (index) {
      if (this.curActiveIndex === index && this.curSelectIndex !== index) {
        return {
          width: '8px !important',
          height: '8px !important',
          marginLeft: '1.5px'
        }
      }
      if (this.curSelectIndex === index) {
        return {
          width: '12px !important',
          height: '12px !important',
          marginLeft: '1.6px'
        }
      }
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
    .page-pagination-active {
      width: 8px !important;
      height: 8px !important;
      margin-left: 1.5px;
    }
    .page-pagination-select {
      width: 12px !important;
      height: 12px !important;
      margin-left: 2px;
    }
  }
</style>
