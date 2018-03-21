<template>
  <div class="article-detail-container">
    <div class="article-detail-title-info" v-if="article.id">
      <div class="article-detail-title">{{article.title}}</div>
      <div class="article-detail-info">
        <div>
          <icon name="user" scale="1.3"></icon>
          <span class="article-info-author">{{article.author}}</span>
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
          <span  class="article-info-date">{{article.creat_date}}</span>
        </div>
      </div>
      <div class="article-detail-content">
        {{article.content}}
      </div>
      <div class="article-detail-reference">这里是参考信息</div>
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
        <div class="article-detail-comment-total">154&nbsp;&nbsp;评论</div>
        <!--推送提醒-->
        <!--<div class="article-detail-comment-notice">
          <Alert show-icon closable>
            <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
            <template slot="desc">
              Content of prompt. Content of prompt. Content of prompt.
            </template>
          </Alert>
        </div>-->
        <div class="article-detail-comment-head">
          <div class="article-detail-comment-all">
            全部评论
            <icon class="article-detail-comment-all-selected" name="caret-up" scale="1"></icon>
          </div>
          <div class="article-detail-comment-page">
            <div class="article-detail-comment-page-total">共55页</div>
            <div class="article-detail-comment-page-list">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>...</span>
              <span>55</span>
            </div>
            <div class="article-detail-comment-page-next">下一页</div>
          </div>
        </div>
        <div class="article-detail-comment-login">
          <logout-publish @publish-comment="publishComment" @handle-login="handleLogin"></logout-publish>
        </div>
        <div class="article-detail-comment-content">
          <comment></comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockText from '../components/BlockText'
import Comment from '../components/Comment'
import LogoutPulish from '../components/LogoutPulish'
import articleMixin from '../mixins/article'

export default {
  name: 'article-detail',
  components: {
    'block-text': BlockText,
    'comment': Comment,
    'logout-publish': LogoutPulish
  },
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.$nextTick(function () {
      document.body.scrollTop = 1
      document.documentElement.scrollTop = 1
    })
  },
  methods: {
    initData () {
      let articleId = this.$route.params.id
      this.article = articleMixin.getArticleById(articleId)
    },
    publishComment () {
      alert('你想发布吗')
    },
    handleLogin () {
      alert('你想登陆吗')
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
      color: $font-color;
      font-size: $font-size;
      width: 62%;
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
            color: #ffffff;
          }
        }
      }
      .article-detail-content {
        /*text-indent: 2em;*/
      }
      .article-detail-rights {
        width: 100%;
        .article-detail-rights-text {
          color: $base-color;
        }
        .article-detail-rights-link {
          /*color: lime;*/
        }
      }
      .article-detail-reference {
        margin: 30px 0;
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
        .article-detail-comment-total {
          margin-bottom: 10px;
          font-size: 18px;
          color: #81A1B4;
        }
        .article-detail-comment-head {
          border-bottom: 1px solid #E5E9EF;
          font-size: 14px;
          @include flex-define(row, space-between, center);
          .article-detail-comment-all {
            position: relative;
            color: $theme-color;
            height: 40px;
            padding-top: 8px;
            border-bottom: 1px solid $theme-color;
            margin-bottom: -1px;
            .article-detail-comment-all-selected {
              bottom: -5px;
              position: absolute;
              left: 24px;
              color: $theme-color;
              /*height: 5px;
              width: 5px;
              background-color: $theme-color;*/
              /*-webkit-transform: rotate(45deg);        for Chrome || Safari */
              /*-moz-transform: rotate(45deg);           for Firefox */
              /*-ms-transform: rotate(45deg);            for IE */
              /*-o-transform: rotate(45deg);         for Opera */
            }
          }
          .article-detail-comment-page {
            height: 40px;
            @include flex-define(row, space-between, center);
            .article-detail-comment-page-list {
              margin: 0 10px;
            }
          }
        }
        .article-detail-comment-login{
          margin: 25px 0;
        }
        .article-detail-comment-content {
          margin: 10px 0;
        }
      }
    }
  }
</style>
