<template>
  <div class="full-page-root">
    <full-page :options="options" id="fullPage" ref="fullPage">

      <div class="section">
        <div class="about-cover"></div>
        <div class="about-cover-container">
          <icon @click.native="jumpNext" class="sixty-about-top-cover-down" name="angle-down" scale="3" />
          <div class="sixty-about-avatar">
            <img class="about-avatar-image" :src="sixtyLogo" @click="avatarJump">
            <h1 class="name">Sixty</h1>
            <h3>生活不止眼前的代码，还有弹不响的吉他弦</h3>
          </div>
        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-start about-me-common">
          <transition
            enter-active-class='animated zoomIn'
            leave-active-class='animated zoomOut'>
            <h2 v-if="firstStart">假设正经的开场白</h2>
          </transition>

          <p>Hello，陌生人，欢迎来到我的窝</p>
          <p>大千世界，你我在此相遇就是缘分</p>
          <p>从你踏入sixty's Den我们就是朋友了</p>
          <p>接下来，我带您了解一下在下</p>
          <p>走吧，继续</p>
        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-hobby about-me-common">
          <h2># My hobby</h2>

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

          <p>>_&nbsp;&nbsp;嗯，总结一下就是，我喜欢不断学习的感觉，周末不在图书馆就在麦当劳、咖啡厅...</p><br>

        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-skills about-me-common">
          <h2># My skills</h2>
          <h3>## 概览</h3>

          <div style="margin: 10px 0;">
            <div class="sixty-about-me-skill">
              <div class="sixty-about-me-skill-type">前端：</div>
              <Progress style="width: 600px;" :percent="75" status="active" :stroke-width="15" />
            </div>

            <div class="sixty-about-me-skill" style="">
              <span class="sixty-about-me-skill-type">后端：</span>
              <Progress style="width: 600px;" :percent="50" status="active" :stroke-width="15" />
            </div>

            <div class="sixty-about-me-skill" style="">
              <span class="sixty-about-me-skill-type">Linux：</span>
              <Progress style="width: 600px;" :percent="30" status="active" :stroke-width="15" />
            </div>
          </div>

          <h3>## 描述</h3>
          <div class="sixty-about-me-skill-desc">

          </div>
          <p style="margin: 10px 0;">
            * 目前，我主要做前端开发。主要技术栈是vue，当然原生js基础就不说了，这是基础。react也自己玩玩，
            但是没有在公司的项目上使用过（我们公司目前技术栈前端是vue后端是php，所以我后端也是php）。另外，
            在下基本掌握大前端的构建方式；熟悉从构建项目到开发项目，到代码测试，到项目上线的基本流程。
          </p>
          <p>
            * 在下从大三开始实习，现在工作差不多两年多，其中php开发半年，其余都是前端开发。当前前端的能力是：
            可以自己构建前端项目，简单的优化，然后写一些简单的shell脚本实现快速打包上线、切换版本等。
            可以带一两个实习生一起开发项目小型项目。后端：能写基本的接口和微服务模块。目前正在学习go语言相关...
          </p><br>
          <p>
            * 如果有需要的话这里有一份稍微详细的
            <a class="about-content-keywords3 keywords-link2" href="https://lib.sixtyden.com/resume.pdf" download>简历</a>。
          </p>
        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-sixty about-me-common">
          <h2># About SixtyDen</h2>
          <h4 class="self-make">## 自己搭博客原因</h4>
          <p class="self-make">
            关于本渣博首先要说的是，它非常的简单，却也是在下纯手工写的。由于在这段时间一直是996的状态，
            所以这个博客都是空隙时间写的，时间跨度稍大了些。为什么要自己写个博客呢，其实是为了完成
            大学里没能做完的博客（其实之前也有一版本，是thinkPHP5的），最重要的原因是可以让我保持写文章的习惯，
            你懂了多少，写出来就算是一个总结，不写不知道，一写才吓一跳哦。
          </p>
          <h4>## 本渣博基本配置</h4>
          <div>
            <p><span class="config-title">前端：</span>vue全家桶</p>
            <p><span class="config-title">后端：</span>yii + mysql</p>
            <p><span class="config-title">服务器：</span>nginx + 腾讯云</p>
            <p><span class="config-title">云存储：</span>七牛云</p>
            <p style="margin-top: 10px">
              在下从来不懂什么是美感，所以本站的几乎所有UI都不是我自己设计的，所以在下就借鉴了百家之长。
              首先本站的配色为Apple官网的topbar配色，topbar的设计也是Apple官网的topbar样式。然后整站的评论组件都是
              借鉴B站的设计，你可以看到基本上是一样的。内容方面的设计我也是在浏览了上百个博客网站后（不夸张，是真的，
              但是他们都长得差不多，因为都用的hexo吧）才成了现在这样（真的很纠结-_=）。本人由于是火影迷，所以你可以感知到整站都有点火影的影子。
              好啦，大概就这样吧，一个很简单的用来记笔记的博客。
            </p>
            <p style="margin-top: 10px">对了，有些文章的顶部有个网易云音乐的开关，你无聊的时候可以点击播放一下，那里只会播放纯音乐哟，都是我珍藏的哦。</p>
          </div>
        </div>
      </div>

      <div class="section about-me-container">
        <div class="about-me-contact about-me-common">
          <h2>You can find me</h2>

          <contact style="margin: 20px 0"/>

          <div class="back-home">
            <div class="wrapper" @click="avatarJump">
              <div class="heart semicircle-vertical"></div>
              <div class="heart"></div>
              <div class="heart semicircle-horizontal"></div>
            </div>
          </div>

        </div>
      </div>
    </full-page>

    <!--full-page分页-->
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

    <!--回到主页-->
    <div class="go-back-avatar-container">
      <img class="go-back-avatar-image" :src="sixtyLogo" @click="avatarJump">
    </div>
  </div>
</template>

<script>
import { SIXTY_LOGO } from '../const'
import Contact from '../../src/components/Contact'
import Avatar from '../../src/components/Avatar'

export default {
  name: 'about',

  components: {
    Avatar,
    Contact
  },

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
      sixtyLogo: SIXTY_LOGO,
      firstStart: false
    }
  },

  created () {
    setTimeout(() => {
      this.firstStart = true
    }, 500)
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
      this.$router.push('/blog')
    }
  }
}
</script>

<style lang="less">
  @import "../style/base/base";
  @import "../style/mixin/baseMixin.less";

  .full-page-root {
    position: relative;
    height: 100%;
    width: 100%;
    font-size: @font-size;
    .fp-tableCell {
      width: 100%;
      color: #ffffff;
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
          color: @hover-color;
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
        color: @theme-background-color;
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
        h2 {
          margin-bottom: 20px;
        }
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
          .keywords(red)
        }
        .about-content-keywords2 {
          .keywords(#9876AA)
        }
        .about-content-keywords3 {
          .keywords(#FFC66D)
        }
        .about-content-keywords4 {
          .keywords(#FFA347)
        }
        .about-content-keywords5 {
          .keywords(#FED95F)
        }
      }

      .about-me-skills {
        .sixty-about-me-skill {
          display: flex;
          padding-left: 20px;
          .sixty-about-me-skill-type {
            width: 70px;
            font-weight: 500;
          }
        }
      }

      .about-me-sixty {
        line-height: 2em;
        .config-title {
          font-weight: 500;
        }
      }

      .about-me-contact {
        text-align: center;
        .back-home {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -30px;
          .wrapper {
            font-size: 0; /*去除inline-block各元素之间的间距*/
            transform:  rotate(45deg);
            -webkit-transform:  rotate(45deg);
            -o-transform:  rotate(45deg);
            -moz-transform:  rotate(45deg);
            animation: bounce .8s infinite;
            -moz-animation: bounce .8s infinite;
            -webkit-animation: bounce .8s infinite;
            -o-animation: bounce .8s infinite;
          }
          .heart {
            height: 15px;
            width: 15px;
            background-color: #ff5928;
            display: inline-block;
            cursor: pointer;
          }
          .semicircle-horizontal {
            border-radius: 15px 15px 0 0;
            height: 7.5px;
            margin-bottom: 15px;
            margin-left: -15px;
          }
          .semicircle-vertical {
            border-radius: 25px 0 0 25px;
            width: 7.5px;
          }
          @keyframes bounce {
            50% { transform:  rotate(45deg) scale(0.8); }
          }
          @-o-keyframes bounce {
            50% { transform:  rotate(45deg) scale(0.8); }
          }
          @-moz-keyframes bounce {
            50% { transform:  rotate(45deg) scale(0.8); }
          }
          @-webkit-keyframes  bounce {
            50% { transform:  rotate(45deg) scale(0.8); }
          }
        }
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
          background-color: #ffffff;
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
    .go-back-avatar-container {
      position: absolute;
      top: 15px;
      left: 15px;
      .go-back-avatar-image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        -webkit-animation:rotate 3s linear infinite;
        @-webkit-keyframes rotate {
          0%{-webkit-transform:rotate(0deg);}

          25%{-webkit-transform:rotate(90deg);}

          50%{-webkit-transform:rotate(180deg);}

          75%{-webkit-transform:rotate(270deg);}

          100%{-webkit-transform:rotate(360deg);}
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .sixty-about-me {
      width: 94% !important;
    }
    .sixty-about-me-skill-type {
      width: 120px !important;
    }
    .sixty-about-top-cover {
      background-image: url(@aboutCover2)!important;
    }
    .about-me-common {
      font-size: 12px !important;
      margin: 0 2% !important;
      line-height: 2em !important;
    }
    .self-make {
      display: none;
    }
  }

  @media screen and (min-width: 1500px) {
    .about-me-common {
      margin: 0 32% !important;
    }
  }
</style>
