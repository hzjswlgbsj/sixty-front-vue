<template>
  <div class="main-layout-index-container">
    <div class="main-layout-index-content-container">
      <div class="main-layout-index-content">
        <avatar class="main-layout-avatar" :src="sixtyLogo" size="80px" rotate></avatar>
        <span class="main-layout-desc">Sixty's Den</span>
        <p class="main-layout-motto">活到老，学到老</p>
        <common-line width="50%" class="main-layout-line"></common-line>
        <p class="main-layout-self-intro">嗨，我是刘林 (@Sixty)，一名来自中国的web开发者。现居南京，就职于育儿网。正在修炼，探索适合自己的方向。</p>
        <common-line width="15%" class="main-layout-line"></common-line>
        <p class="main-layout-self-desc">生活不止眼前的代码，还有弹不响的吉他弦。</p>
        <div class="main-layout-module">
          <span class="main-layout-module-name" @click="changePage('blog')">博客</span>
          <span class="main-layout-module-name" @click="changePage('tucao')">吐槽</span>
          <span class="main-layout-module-name" @click="changePage('resources')">资源</span>
          <span class="main-layout-module-name" @click="changePage('about')">关于</span>
        </div>
        <!--这里其实应该用数据源去循环出来，做可配置的组件，这边我就不做了-->
        <div class="main-layout-contact">
          <a href="https://github.com/hzjswlgbsj" target="_blank">
            <span class="contact-icon main-layout-contact-github">
              <icon name="github" scale="1.5"></icon>
            </span>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100023910004726" target="_blank">
            <span class="contact-icon main-layout-contact-facebook">
              <icon name="facebook-square" scale="1.5"></icon>
            </span>
          </a>
          <a href="https://weibo.com/hiliulin" target="_blank">
            <span class="contact-icon main-layout-contact-weibo">
              <icon name="weibo" scale="1.5"></icon>
            </span>
          </a>
          <a href="https://twitter.com/hiliulin" target="_blank">
            <span class="contact-icon main-layout-contact-twitter">
            <icon name="twitter" scale="1.5"></icon>
            </span>
          </a>
          <span class="contact-icon main-layout-contact-wechat"><icon name="wechat" scale="1.5"></icon></span>
          <span class="contact-icon main-layout-contact-qq"><icon name="qq" scale="1.3"></icon></span>
        </div>
      </div>
    </div>
    <div class="main-layout-index-cover cover-blue"></div>
  </div>
</template>

<script>
import Avatar from '../../../src/components/Avatar'
import CommonLine from '../../components/CommonLine'
import routerMixin from '../../mixins/router'
import { SIXTY_LOGO } from '../../const/index'
export default {
  name: 'introduction',
  data () {
    return {
      sixtyLogo: SIXTY_LOGO
    }
  },
  mixins: [routerMixin],
  components: {
    'avatar': Avatar,
    'common-line': CommonLine
  },
  methods: {
    changePage (router) {
      this.jump(router)
    },
    goBlank (url) {
      alert(url)
      window.location(url)
    }
  }
}
</script>

<style lang="scss"  scoped>
  @import "../../style/mixin/baseMixin";
  @import "../../style/base/base";
  .main-layout-index-container {
    display: table;
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("http://ovrjw2my5.bkt.clouddn.com/Sky.jpg");
    text-align: center;
    color: #FEFEFE;
    font-size: $font-size;
    font-family: $font-family;
    .main-layout-index-content-container {
      display: table-cell;
      vertical-align: middle;
      position: relative;
      padding: 0 60px;
      text-align: center;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
      .main-layout-index-content {
        max-width: 620px;
        margin: 0 auto;
        .main-layout-avatar {
          /*padding-top: 50px;*/
        }
        .main-layout-desc {
          margin: 0 0 5px 0;
          font-size: 3em;
          letter-spacing: 4px; /*此属性减少或增加字符之间的间隔*/
        }
        .main-layout-motto {
          color: #CCCCCC;
          font-size: 1.5em;
        }
        .main-layout-line {
          margin: 20px 0;
        }
        .main-layout-self-intro, .main-layout-self-desc {
          font-size: 1.2em;
        }
        .main-layout-module {
          margin: 50px 0;
          .main-layout-module-name {
            padding: 10px 20px;
            border: 1px solid #ffffff;
            border-radius: 20px;
            margin-right: 10px;
            &:hover {
              cursor:pointer;
              background-color: #2baee9;
            }
          }
        }
        .main-layout-contact {
          margin: 0 auto;
          .contact-icon{
            margin-right: 20px;
            &:hover {
              cursor:pointer;
            }
          }
          .main-layout-contact-github:hover {
            color: #E58C7C;
          }
          .main-layout-contact-facebook:hover {
            color: #3B5A95;
          }
          .main-layout-contact-weibo:hover {
            color: #E52130;
          }
          .main-layout-contact-twitter:hover {
            color: #1AA0EF;
          }
          .main-layout-contact-wechat:hover {
            color: #86D850;
          }
          .main-layout-contact-qq:hover {
            color: #333333;
          }
        }
      }
    }
    .main-layout-index-cover {
      display: block;
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .cover-blue {
      background-color: #046d78;
      opacity: 0.6;
    }

    @media screen and (max-width: 480px) {
      font-size: 12px;
      .main-layout-index-content-container {
        padding: 0 30px;
      }
    }
    @media screen and (max-width: 320px) {
      .main-layout-module {
        margin: 30px 0 !important;
        .main-layout-module-name {
          padding: 5px 10px !important;
        }
      }
      .main-layout-contact {
        .contact-icon {
          margin-right: 10px !important;
        }
      }
    }
  }
</style>
