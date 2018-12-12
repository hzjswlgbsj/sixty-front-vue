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
        <div class="about-me-start about-me-common">
          <h2 style="margin-bottom: 20px">假设正经的开场白</h2>
          <p>Hello，陌生人，欢迎来到我的窝</p>
          <p>大千世界，你我在此相遇就是缘分</p>
          <p>从你踏入sixty's Den我们就是朋友了</p>
          <p>接下来，我带您了解一下在下</p>
          <p>走吧，继续</p>
        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-hobby about-me-common">
          <h1>My hobby</h1>

          <p>
            >&nbsp;&nbsp;喜欢
            <span class="about-content-keywords">做菜</span>
            但是厨艺不精，喜欢
            <span class="about-content-keywords2">指弹</span>
            但是手残，喜欢
            <span class="about-content-keywords3">撸码</span>
            但不是大佬，立志成为大佬。
          </p>

          <p>>&nbsp;&nbsp;追求自由的生活，不喜欢待在家里，由于喜欢撸码，所以出门经常带电脑，混迹于麦当劳、图书馆、咖啡厅...</p>
          <p>>&nbsp;&nbsp;喜欢旅游，不怕折腾。立志要爬遍祖国所有名山，当前完成：青城山、黄山、华山、贺兰山</p>

          <p>
            >&nbsp;&nbsp;喜欢怀旧，有时候坐在图书馆，看着窗外就开始了"回忆动画片"，脑海不断闪现：乡下初春的春芽树
            （四川方言，好像就是香椿树）最先长出嫩芽， 外面的水库开始灌满了河水，天空的星星开始变多，
            水池的蛙声越来越多却不显得吵闹。
            我喜欢夏日跑到小河沟去抓螃蟹，跑到"人民渠"去洗澡，吃着一毛钱一袋的辣条（
            <a class="about-content-keywords keywords-link1" href="https://baike.baidu.com/item/%E5%A4%A7%E5%88%80%E8%82%89" target="_blank">大刀肉</a>
            ，你懂的）
            奔跑在树木笼罩的泥路上。你知道那种感觉吗？
          </p>
          <p>
            那时候我的包里总是揣着
            <a class="about-content-keywords3 keywords-link2" href="https://baike.baidu.com/item/%E9%98%BF%E8%A1%B0" target="_blank">阿衰</a>
            ，有时上课还要偷偷看几眼，
            老汉儿买的学英语的复（M）读（P）机（3）从来都只有买时候送的英语单词磁带，其他的全是
            <span class="about-content-keywords">周杰伦</span>
            的专辑磁带；老汉儿买的
            <span class="about-content-keywords5">好（yóu）记（xì）星（jī）</span>
            最大的用处就是躲在被窝里玩
            <a class="about-content-keywords2 keywords-link3" href="https://baike.baidu.com/item/%E9%AD%94%E5%A1%94" target="_blank">魔塔</a>
            ，没事的时候就坐在电视机旁边等土豪去星空卫视点播
            <span class="about-content-keywords4">火影</span>
            。。。
          </p>

          <p>>&nbsp;&nbsp;呃... 赶紧醒醒</p>

          <p>>_&nbsp;&nbsp;嗯，总结一下就是，我确实喜欢不断学习，周末不在图书馆就在麦当劳、咖啡厅...</p><br>

        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-skills about-me-common">
          <h1>My skills</h1>
        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-sixty about-me-common">
          <h1>About SixtyDen</h1>
        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-contact about-me-common">
          <h1>Find me</h1>
        </div>
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
        sectionsColor: ['#000000', '#41b883', '#333333', '#2c3e4f', '#ff5f45', '#ee1a59', '#ba5be9', '#0798ec', '#fec401', '#1bcee6'],
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
  @import "../style/mixin/baseMixin.scss";

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
      display: flex;
      justify-content: center;
      p {
        color: $font-color;
      }
      .about-me-common {
        height: 100%;
        vertical-align: middle;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        line-height: 2.5em;
        font-size: 1.4em;
        margin: 0 19%;
      }

      .about-me-start {
        text-align: center;
      }

      .about-me-hobby {
        .keywords-link1 {
          border-bottom: 1px solid red;
        }
        .keywords-link2 {
          border-bottom: 1px solid #FFC66D;
        }
        .keywords-link3 {
          border-bottom: 1px solid #9876AA;
        }
        .about-content-keywords {
          @include keywords(red)
        }
        .about-content-keywords2 {
          @include keywords(#9876AA)
        }
        .about-content-keywords3 {
          @include keywords(#FFC66D)
        }
        .about-content-keywords4 {
          @include keywords(#FFA347)
        }
        .about-content-keywords5 {
          @include keywords(#FED95F)
        }
      }

      .about-me-skills {

      }

      .about-me-sixty {

      }

      .about-me-contact {

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
