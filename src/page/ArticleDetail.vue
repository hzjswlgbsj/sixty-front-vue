<template>
  <div class="article-detail-container">
    <div class="article-detail-title-info" v-if="article.id">
      <div class="article-detail-top-cover" :style="detailCover"></div>
      <div class="article-detail-title-container">
        <transition
          enter-active-class='animated rubberBand'>
          <div v-if="showTitle" class="article-detail-title">{{article.title}}</div>
        </transition>
        <article-info :article-data="article"/>
      </div>

      <music-player v-if="article.music_id > 0" :id="Number(article.music_id)"/>

      <div class="article-detail-content">
        <mavon-editor
          class="article-detail-content-markdown"
          :toolbars-flag="false"
          :subfield="false"
          default-open="preview"
          code-style="atom-one-dark"
          :box-shadow="false"
          v-model="article.content"/>
      </div>
      <!--<div class="article-detail-reference">-->
        <!--<h3>参考信息</h3>-->
        <!--<div class="article-detail-reference-content" v-if="reference && reference.length > 0">-->
          <!--<div class="article-detail-reference-link" v-for="(item, index) in reference" :key="index">-->
            <!--<a :href="item.link">[{{index + 1}}] {{item.description}}</a>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="article-detail-reference-content" v-else>哈哈，看来这是一篇纯原创^_^</div>-->
      <!--</div>-->
      <!--<div class="article-detail-qrcode">这里是二维码</div>-->
      <div class="article-detail-rights">
        <block-text backgroundColor="#1B1D23" width="100%">
          <span class="article-detail-rights-text">本作品采用 </span>
          <span>
            <a class="article-detail-rights-link" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">
              知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议
            </a>
          </span>
          <span class="article-detail-rights-text"> 进行许可，转载请注明来源。</span>
        </block-text>
      </div>
      <div class="article-detail-previous-next">
        <div class="article-detail-previous" v-if="article.preArticle" @click="jumpById(article.preArticle.id)">
          <Icon style="margin-right: 10px" size="20" type="ios-arrow-back"></Icon>
          <span class="article-detail-previous-text">
            {{article.preArticle.title}}
          </span>
        </div>
        <div class="article-detail-next" v-if="article.nextArticle" @click="jumpById(article.nextArticle.id)">
          <span class="article-detail-next-text">
            {{article.nextArticle.title}}
          </span>
          <Icon style="margin-left: 10px" size="20" type="ios-arrow-forward"></Icon>
        </div>
      </div>
      <!--<div class="article-detail-share">分享区域</div>-->
      <div class="article-detail-comment" v-if="showTitle">
        <comment
          :article-ready="showTitle"
          :comment-total="parseInt(commentData.total)"
          :commentData="commentData.data"
          :article-id="currentArticleId"
          :article-title="article.title"
          @refresh-comment-data="initCommentData(true)" />
      </div>
    </div>

    <div v-if="showLoading" style="margin-top: 10px">
      <vue-loading
        type="spiningDubbles"
        color="#2BBC8A"
        :size="{ width: '30px', height: '30px' }" />
    </div>

    <div v-if="!showLoading && !showTitle" style="text-align: center;margin-top: 60px">你的网络不给力哦</div>
  </div>
</template>

<script>
import { Store } from '../common'
import BlockText from '../components/BlockText'
import Comment from '../components/Comment'
import MusicPlayer from '../components/MusicPlayer'
import { getArticleById, remoteGetComment } from '../service/article'
import ArticleInfo from '../components/ArticleInfo'

export default {
  name: 'article-detail',
  components: {
    BlockText,
    Comment,
    ArticleInfo,
    MusicPlayer
  },
  data () {
    return {
      article: {},
      reference: [
        {
          description: 'mysql中两条sql语句一起执行，第一条出错，第二条能执行吗？',
          link: 'http://www.hiliulin.com'
        },
        {
          description: 'macos环境下搭建php7开发环境',
          link: 'http://www.baidu.com'
        },
        {
          description: 'react源码阅读分享，系列文章之组件间通讯',
          link: 'https://doc.react-china.org/'
        }
      ],
      currentArticleId: '',
      showTitle: false,
      showLoading: true
    }
  },
  created () {
    this.initData()
  },
  computed: {
    commentData () {
      return Store.store('currentComment')
    },
    articleCoverImg () {
      try {
        if (this.article['cover_picture']) {
          return JSON.parse(this.article['cover_picture'])
        }
        return []
      } catch (e) {
        console.log(e)
      }
    },
    detailCover () {
      const width = document.body.clientWidth
      if (this.articleCoverImg.length > 0) {
        return {
          backgroundImage: `url(${this.articleCoverImg[0].url})`,
          width: `${width}px`
        }
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      document.body.scrollTop = 1
      document.documentElement.scrollTop = 1
    })
  },
  methods: {
    async initData () {
      this.currentArticleId = this.$route.params.id
      this.initArticleData()
      this.initCommentData(true)
    },
    async initArticleData () {
      try {
        this.article = await getArticleById(this.currentArticleId)
        if (this.article.id) {
          this.showLoading = false
          setTimeout(() => {
            this.showTitle = true
          }, 0)
        }
      } catch (e) {
        this.showLoading = false
        console.log(e)
      }
    },
    async initCommentData (refresh = false) {
      try {
        await remoteGetComment(refresh, this.currentArticleId)
      } catch (e) {
        console.log(e)
      }
    },
    jumpById (id) {
      let url = `${window.location.origin}/blog/articleDetail/${id}`
      window.location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  @import "../style/base/base";
  .article-detail-container {
    @include flex-define(column, center, center);
    /*margin-top: 60px;*/
    .article-detail-title-info {
      @include flex-define(column, center, center);
      color: #ffffff;
      font-size: $font-size;
      width: 62%;
      max-width: 880px;
      .article-detail-top-cover {
        height: 400px;
        border-radius: 5px;
        margin-bottom: 30px;
        display: block;
        background-color: rgba(0, 0, 0, .6);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        transition: opacity 1s;
        opacity: .5;
      }
      .article-detail-title-container {
        z-index: 2;
        .article-detail-title {
          margin-top: -280px;
          text-align: center;
          font-size: 40px;
        }
      }
      .article-detail-info {
        @include flex-define(row, start, center);
        margin: 10px 0 20px 0;
        div {
          @include flex-define(row, space-between, center);
          margin-right: 15px;
          &:hover {
            cursor: pointer;
          }
          .article-info-author, .article-info-comment, .article-info-view, .article-info-date {
            margin-left: 5px;
            color: #DAE1E8;
          }
        }
      }
      .article-detail-content {
        /*text-indent: 2em;*/
        width: 100%;
        margin-top: 20px;
        .article-detail-content-markdown {
          width: 100%;
          z-index: auto;
        }
      }
      .article-detail-rights {
        width: 100%;
        .article-detail-rights-text {
          color: $font-color;
        }
        .article-detail-rights-link {
          color: $theme-color;
          &:hover {
            color: $hover-color !important;
          }
        }
      }
      .article-detail-reference {
        width: 100%;
        margin: 30px 0;
        .article-detail-reference-content {
          margin: 10px 0 0 20px;
          line-height: 1.6em;
          .article-detail-reference-link a {
            color: #DAE1E8;
            &:hover {
              color: $hover-color;
            }
          }
        }
      }
      .article-detail-previous-next {
        @include flex-define(row, space-between, center);
        width: 100%;
        margin: 20px 0;
        .article-detail-previous, .article-detail-next {
          &:hover {
            cursor: pointer;
            color: $hover-color;
          }
        }
      }
      .article-detail-comment {
        width: 100%;
        text-align: left;
        margin-top: 10px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .article-detail-title-info {
      width: 96% !important;
    }
  }
</style>
