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
        <comment :commentData="commentData"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import BlockText from '../components/BlockText'
import Comment from '../components/Comment'
import articleMixin from '../mixins/article'

export default {
  name: 'article-detail',
  components: {
    'block-text': BlockText,
    'comment': Comment
  },
  data () {
    return {
      article: {},
      commentData: [
        {
          id: 1,
          article_id: 1, // 文章id
          content: '这里是sixtyDen',
          create_time: '2018-03-26 15:26',
          user_id: 1,
          type: 1, // 1表示文章评论，2表示留言
          reply: [
            { // 二级评论
              id: 4,
              reply_id: 3, // 表示回复的是哪一条评论
              reply_user_id: 4, // 表示被回复那条评论的用户
              parent_id: 1, // 表示当前评论哪条评论下面
              content: '欢迎一起交流，一起学习',
              create_time: '2018-03-26 15:29',
              user_id: 2,
              page: {
                cur_page: 1,
                all_page: 1
              }
            },
            { // 二级评论
              id: 5,
              reply_id: 3, // 表示回复的是哪一条评论
              reply_user_id: 4, // 表示被回复那条评论的用户
              parent_id: 1, // 表示当前评论哪条评论下面
              content: '我觉得这评论不错的',
              create_time: '2018-03-26 15:29',
              user_id: 2,
              page: {
                cur_page: 1,
                all_page: 1
              }
            }
          ],
          page: { // 分页
            cur_page: 1,
            all_page: 1
          }
        }
      ]
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
      }
    }
  }
</style>
