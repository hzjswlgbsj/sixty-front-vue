<template>
  <div class="main-layout-index-container">
    <div class="main-layout-index-content-container">
      <div class="main-layout-index-content">
        <avatar class="main-layout-avatar" :src="sixtyLogo" size="80px" rotate></avatar>
        <span class="main-layout-desc">Sixty's Den</span>
        <p class="main-layout-motto">活到老，学到老</p>
        <common-line width="50%" class="main-layout-line"></common-line>
        <p class="main-layout-self-intro">嗨，我是刘林 (@Sixty)，一名来自天府之国的web开发者，现居南京，就职于育儿网，正在前端的浑水里摸爬打滚。</p>
        <common-line width="15%" class="main-layout-line"></common-line>
        <p class="main-layout-self-desc">生活不止眼前的代码，还有弹不响的吉他弦。</p>
        <div class="main-layout-module" v-if="menuList && menuList.length > 0">
          <span
            v-for="(item, index) in menuList"
            :key="index"
            class="main-layout-module-name"
            @click="changePage(item)">
            {{ item.text }}
          </span>
        </div>

        <contact/>
      </div>
    </div>
    <div class="main-layout-index-cover cover-blue"></div>
  </div>
</template>

<script>
import Avatar from '../../../src/components/Avatar'
import Contact from '../../../src/components/Contact'
import CommonLine from '../../components/CommonLine'
import { SIXTY_LOGO, MENU_LIST } from '../../const'
import { Storage } from '../../common'

export default {
  name: 'introduction',
  data () {
    return {
      sixtyLogo: SIXTY_LOGO,
      menuList: [
        {text: '博客', name: 'Blog', path: '/blog'},
        {text: '吐槽', name: 'Tucao', path: '/tucao'},
        {text: '坑点', name: 'Error', path: '/error'},
        {text: '关于', name: 'About', path: '/about'}
      ]
    }
  },
  components: {
    Avatar,
    CommonLine,
    Contact
  },
  methods: {
    changePage (router) {
      MENU_LIST.map((item, index) => {
        if (item.label === router.name) {
          Storage.storage('curRouterIndex', index)
        }
      })
      this.$router.push(router.path)
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
    background-image: url($indexBackground);
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
