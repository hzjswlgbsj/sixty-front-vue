<template>
  <div class="article-detail-container">
    <div class="article-detail-title-info" v-if="article.id">
      <div class="article-detail-title">{{article.title}}</div>
      <div class="article-detail-info">
        <div>
          <icon name="user" scale="1.3"></icon>
          <span class="article-info-author">{{article.nickname}}</span>
        </div>
        <div>
          <icon name="comments" scale="1.3"></icon>
          <span class="article-info-comment">34 Comments</span>
        </div>
        <div>
          <icon name="eye" scale="1.3"></icon>
          <span class="article-info-view">{{article.views}} Views</span>
        </div>
        <div>
          <icon name="calendar" scale="1"></icon>
          <span  class="article-info-date">{{article.create_time}}</span>
        </div>
      </div>
      <div class="article-detail-content">
        <mavon-editor
          class="article-detail-content-markdown"
          :toolbars-flag="false"
          :subfield="false"
          default-open="preview"
          code-style="androidstudio"
          :box-shadow="false"
          v-model="article.content"/>
      </div>
      <div class="article-detail-reference">
        <h3>参考信息</h3>
        <div class="article-detail-reference-content" v-if="reference && reference.length > 0">
          <div class="article-detail-reference-link" v-for="(item, index) in reference" :key="index">
            <a :href="item.link">[{{index + 1}}] {{item.description}}</a>
          </div>
        </div>
        <div class="article-detail-reference-content" v-else>哈哈，看来这是一篇纯原创^_^</div>
      </div>
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
        <div class="article-detail-previous">
          <Icon style="margin-right: 10px" type="chevron-left"></Icon>
          <span class="article-detail-previous-text">
            大学给了我们什么
          </span>
        </div>
        <div class="article-detail-next">
          <span class="article-detail-next-text">
            mac系统搭建php开发环境
          </span>
          <Icon style="margin-left: 10px" type="chevron-right"></Icon>
        </div>
      </div>
      <!--<div class="article-detail-share">分享区域</div>-->
      <div class="article-detail-comment">
        <comment :comment-total="parseInt(commentData.total)" :commentData="commentData.data" :articleId="currentArticleId" @refresh-comment-data="initCommentData(true)"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import dataStore from '../data/index'
import BlockText from '../components/BlockText'
import Comment from '../components/Comment'
import { getArticleById, getComment } from '../service/article'

export default {
  name: 'article-detail',
  components: {
    BlockText,
    Comment
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
      currentArticleId: ''
    }
  },
  created () {
    this.initData()
  },
  computed: {
    commentData () {
      return dataStore.store('currentComment')
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
      } catch (e) {
        console.log(e)
      }
    },
    async initCommentData (refresh = false) {
      try {
        await getComment(refresh, this.currentArticleId)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  @import "../style/base/base";
  .article-detail-container {
    @include flex-define(column, center, center);
    margin-top: 60px;
    .article-detail-title-info {
      @include flex-define(column, center, center);
      color: #DAE1E8;
      font-size: $font-size;
      width: 62%;
      max-width: 880px;
      .article-detail-title {
        font-size: $font-size-title;
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
        .article-detail-content-markdown {
          width: 100%;
          z-index: auto;
        }
      }
      .article-detail-rights {
        width: 100%;
        .article-detail-rights-text {
          color: $base-color;
        }
        .article-detail-rights-link {
          /*color: lime;*/
          &:hover {
            color: #DD021C !important;
          }
        }
      }
      .article-detail-reference {
        width: 100%;
        margin: 30px 0;
        .article-detail-reference-content {
          margin: 10px 0 0 20px;
          line-height: 1.6em;
        }
      }
      .article-detail-previous-next {
        @include flex-define(row, space-between, center);
        width: 100%;
        margin: 20px 0;
        .article-detail-previous, .article-detail-next {
          &:hover {
            cursor: pointer;
            color: #5292DD;
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
</style>
