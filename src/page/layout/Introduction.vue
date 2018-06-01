<template>
  <div class="main-layout-index-container">
    <avatar class="main-layout-avatar" src="http://ovrjw2my5.bkt.clouddn.com/80.jpg" size="80px" rotate></avatar>
    <div class="main-layout-desc">Sixty's Den</div>
    <div class="main-layout-motto">活到老，学到老</div>
    <common-line width="250px" class="main-layout-line"></common-line>
    <div class="main-layout-self-intro">嗨，我是刘林 (@Sixty)，一名来自中国的 web 开发者。现居南京，就职于 育儿网。正在修炼，探索适合自己的方向。</div>
    <common-line width="150px" class="main-layout-line"></common-line>
    <div class="main-layout-self-desc">生活不止眼前的代码，还有弹不响的吉他弦。</div>
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
</template>

<script>
import Avatar from '../../../src/components/Avatar'
import CommonLine from '../../components/CommonLine'
import routerMixin from '../../mixins/router'
export default {
  name: 'introduction',
  data () {
    return {
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
  .main-layout-index-container {
    @include flex-define(column, center, center);
    width: 100%;
    height: 100%;
    margin-top: 20px;
    background-repeat: no-repeat;
    background-size:100% 100%;
    background-image: url("http://ovrjw2my5.bkt.clouddn.com/Sky.jpg");
    text-align: center;
    color: #ffffff;
    font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    .main-layout-avatar {
      /*padding-top: 50px;*/
    }
    .main-layout-desc {
      font-size: 36px;
      font-weight: lighter;
      color: #FEFEFE;
    }
    .main-layout-motto {
      font-size: 18px;
      color: #CCCCCC;
    }
    .main-layout-self-intro, .main-layout-self-desc {
      font-size: 16px;
    }
    .main-layout-line {
      margin: 15px 0;
    }
    .main-layout-self-intro {
      width: 39%;
    }
    .main-layout-module {
      margin-top: 50px;
      .main-layout-module-name {
        padding: 10px 20px;
        border: 1px solid #ffffff;
        border-radius: 20px;
        font-size: 16px;
        margin-right: 10px;
        &:hover {
          cursor:pointer;
          background-color: #2baee9;
        }
      }
    }
    .main-layout-contact {
      margin-top: 50px;
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
</style>
