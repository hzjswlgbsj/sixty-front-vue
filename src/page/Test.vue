<template>
  <div class="full-page-root">
    <full-page :options="options" id="fullPage" ref="fullPage">

      <div class="section">
        <div class="about-cover"></div>
        <div class="about-cover-container">
          <Icon @click="jumpNext" class="sixty-about-top-cover-down" type="ios-arrow-down" size="40"/>

          <div class="sixty-about-avatar">
            <img class="about-avatar-image" :src="sixtyLogo" @click="avatarJump">
            <h1 class="name">Sixty</h1>
            <h3>生活不止眼前的代码，还有弹不响的吉他弦</h3>
          </div>
        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-start">
          <h2 style="margin-bottom: 20px">假设正经的开场白</h2>
          <p>Hello，陌生人，欢迎来到我的窝</p>
          <p>大千世界，你我在此相遇就是缘分</p>
          <p>从你踏入sixty's Den我们就是朋友了</p>
          <p>接下来，我带您了解一下在下</p>
          <p>继续向下翻吧</p>
        </div>
      </div>

      <div class="section about-me-container">
        <h1>My hobby</h1>
      </div>

      <div class="section about-me-container">
        <h1>My skills</h1>
      </div>

      <div class="section about-me-container">
        <h1>About SixtyDen</h1>
      </div>

      <div class="section about-me-container">
        <h1>Find me</h1>
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
import { SIXTY_LOGO } from '../const'
export default {
  name: 'test',
  data () {
    return {
      options: {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        navigation: true,
        navigationPosition: 'right',
        anchors: ['cover', 'start', 'hobby', 'skills', 'sixtyden', 'contact'],
        sectionsColor: ['#000000', '#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab'],
        afterLoad: this.afterLoad
      },
      testData: [1, 2, 3, 4, 5, 6],
      curSelectIndex: 0,
      curActiveIndex: -1,
      sixtyLogo: SIXTY_LOGO
    }
  },
  methods: {
    afterLoad (origin, destination, direction) {
      this.curSelectIndex = destination.index
    },
    jumpNext () {
      this.$refs.fullPage.api.moveSectionDown()
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
    },
    avatarJump () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  @import "../style/base/base";
  .full-page-root {
    position: relative;
    height: 100%;
    width: 100%;
    .fp-tableCell {
      width: 100%;
    }
    .about-cover{
      height: 100%;
      width: 100%;
      background-image: url("https://lib.sixtyden.com/family.jpeg");
      background-color: rgba(0, 0, 0, .6);
      background-size: cover;
      background-repeat: no-repeat;
      transition: opacity 1s;
      opacity: .3;
    }
    .about-cover-container{
      .sixty-about-top-cover-down {
        position: absolute;
        left: 48%;
        top: 90%;
        z-index: 2000;
        cursor: pointer;
        &:hover {
          color: $hover-color;
        }
      }
      .sixty-about-avatar {
        width: 100%;
        text-align: center;
        color: #ffffff;
        position: absolute;
        top: 200px;
        .about-avatar-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          cursor: pointer;
        }
        .name {
          margin: 10px 0;
        }
      }
    }

    .about-me-container {
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      .about-me-start, .about-me-skills, .about-me-sixty {
        height: 100%;
        vertical-align: middle;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        line-height: 2.5em;
        font-size: 1.4em;
      }
    }

    /*右侧的小圆点*/
    .full-page-pagination {
      position: fixed;
      top: 42%;
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
