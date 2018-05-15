<template>
  <div class="comment-container">
    <div class="article-comment">
      <div class="article-comment-total">154&nbsp;&nbsp;评论</div>
      <!--推送提醒-->
      <!--<div class="article-comment-notice">
        <Alert show-icon closable>
          <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
          <template slot="desc">
            Content of prompt. Content of prompt. Content of prompt.
          </template>
        </Alert>
      </div>-->
      <div class="article-comment-head">
        <div class="article-comment-all">
          全部评论
          <icon class="article-comment-all-selected" name="caret-up" scale="1"></icon>
        </div>
        <div class="article-comment-page">
          <div class="article-comment-page-total">共55页</div>
          <div class="article-comment-page-list">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>...</span>
            <span>55</span>
          </div>
          <div class="article-comment-page-next">下一页</div>
        </div>
      </div>
      <div class="article-comment-login">
        <logout-publish :reset-comment="resetComment" @publish-comment="publishComment" @handle-login="handleLogin" :login="login" :user="user"></logout-publish>
      </div>
      <div v-if="comments && comments.length > 0">
        <div class="article-comment-content-container" v-for="comment in comments" :key="comment.id">
          <div class="article-comment-content">
            <div class="comment-parent-avatar">
              <avatar :src="comment.user_avatar" size="50px"></avatar>
            </div>
            <div class="comment-parent-container">
              <div class="comment-parent-info">
                <span class="comment-parent-author">{{comment.user_nickname}}</span>
                <div class="comment-parent-content-text">{{comment.content}}</div>
                <div class="comment-parent-content-info">
                  <div class="comment-parent-content-date">{{comment.create_time}}</div>
                  <div class="comment-parent-content-agree">
                    <icon name="thumbs-o-up" scale="0.8" style="vertical-align: middle"></icon>
                    <span class="comment-parent-content-agree-number">132</span>
                  </div>
                  <div class="comment-parent-content-disagree">
                    <icon name="thumbs-o-down" scale="0.8" style="vertical-align: middle"></icon>
                    <span class="comment-parent-content-disagree-number">2</span>
                  </div>
                  <div class="comment-parent-content-replay" @click="handleReply(comment.id, comment.id, 0)">参与回复</div>
                </div>
                <!--二级评论开始-->
                <div class="comment-reply-container" v-if="comment.children && comment.children.length > 0">
                  <div class="comment-children-container" v-for="reply in comment.children" :key="reply.id">
                    <!--这里是子评论，这里的三段式和主评论可以抽个组件出来，但是我认为评论组件都是一块一起用我就不抽出来了-->
                    <div class="comment-children-avatar">
                      <avatar :src="reply.user_avatar" size="25px"></avatar>
                    </div>
                    <div class="comment-children-info">
                      <div class="comment-children-author-content">
                        <span class="comment-children-author">{{reply.user_nickname}}&nbsp;</span>
                        <span class="comment-children-reply" v-if="reply.reply_id !== reply.parent_id">&nbsp;回复&nbsp;</span>
                        <span class="comment-children-reply-author" v-if="reply.reply_id !== reply.parent_id">@{{reply.parent_user_nickname}}:</span>
                        <span class="comment-children-reply-content">{{reply.content}}</span>
                      </div>
                      <div class="comment-children-content-info">
                        <span class="comment-children-content-date">{{reply.create_time}}</span>
                        <span class="comment-children-content-agree">
                      <icon name="thumbs-o-up" scale="0.8" style="vertical-align: middle"></icon>
                      <span class="comment-children-content-agree-number">132</span>
                    </span>
                        <span class="comment-children-content-replay" @click="handleReply(comment.id, reply.id, reply.user_id)">回复</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--二级评论结束-->
              </div>
            </div>
          </div>
          <logout-publish
            class="article-comment-publish"
            v-if="childrenCommentComponent && currentCommentId === comment.id"
            :reset-comment="resetComment"
            @publish-comment="publishComment"
            @handle-login="handleLogin"
            :login="login"
            :user="user">
          </logout-publish>
          <div class="article-comment-common-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar'
import LogoutPulish from '../components/LogoutPulish'
import { redirectLogin } from '../router/index'
import { checkLogin, getCurrentUser } from '../service/user'
import { addComment } from '../service/article'

export default {
  name: 'comment',
  components: {
    'avatar': Avatar,
    'logout-publish': LogoutPulish
  },
  props: {
    commentData: {
      type: Array,
      default: function () {
        return []
      }
    },
    articleId: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#5292DD'
    },
    color: {
      type: String,
      default: '#cccccc'
    },
    radius: {
      type: String,
      default: '15px'
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'pricetag'
    }
  },
  data () {
    return {
      currentArticleId: this.articleId,
      user: {},
      childrenCommentComponent: true,
      commentForm: {
        parentId: 0,
        replyId: 0,
        parentUserId: 0
      },
      resetComment: false,
      currentCommentId: 0
    }
  },
  created () {
    this.initUserData()
  },
  computed: {
    initStyle () {
      return {
        width: this.width,
        height: this.height,
        'background-color': this.backgroundColor,
        'border-radius': this.radius,
        'font-color': this.color,
        'font-size': this.fontSize
      }
    },
    comments () {
      return this.commentData
    },
    login () {
      return checkLogin()
    }
  },
  methods: {
    initUserData () {
      this.user = getCurrentUser()
    },
    refreshCommentData () {
      this.$emit('refresh-comment-data')
    },
    async publishComment (content) {
      if (!this.login) {
        return
      }
      if (!this.user || !this.user.id) {
        this.$Message.error('没有登录成功哦~')
        return
      }
      if (!content) {
        this.$Message.error('你似乎啥都没说哦~')
        return
      }
      try {
        const ret = await addComment(parseInt(this.currentArticleId), parseInt(this.user.id), content, this.commentForm.parentId, this.commentForm.replyId, this.commentForm.parentUserId)
        if (ret) {
          console.log(6)
          this.$Message.success('评论成功')
          this.refreshCommentData()
          this.resetComment = true
          this.resetForm()
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleReply (parentId, replyId, replyUserId) {
      if (!this.login) {
        this.$Message.error('要先登录才能吐槽哦，^_^')
        return
      }
      this.commentForm.parentId = parseInt(parentId)
      this.commentForm.replyId = parseInt(replyId)
      this.commentForm.replyUserId = parseInt(replyUserId)
      if (this.currentCommentId === parentId) {
        this.childrenCommentComponent = !this.childrenCommentComponent
      }
      this.currentCommentId = parentId
    },
    resetForm () {
      this.commentForm.parentId = 0
      this.commentForm.replyId = 0
      this.commentForm.replyUserId = 0
      this.childrenCommentComponent = !this.childrenCommentComponent
    },
    handleLogin () {
      let router = this.$route.path
      redirectLogin(router)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  @import "../style/base/base";
  .comment-container {
    width: 100%;
    .article-comment {
      width: 100%;
      text-align: left;
      margin-top: 10px;
      .article-comment-total {
        margin-bottom: 10px;
        font-size: 18px;
        color: #81A1B4;
      }
      .article-comment-head {
        border-bottom: 1px solid #E5E9EF;
        font-size: 14px;
        @include flex-define(row, space-between, center);
        .article-comment-all {
          position: relative;
          color: $theme-color;
          height: 40px;
          padding-top: 8px;
          border-bottom: 1px solid $theme-color;
          margin-bottom: -1px;
          .article-comment-all-selected {
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
        .article-comment-page {
          height: 40px;
          @include flex-define(row, space-between, center);
          .article-comment-page-list {
            margin: 0 10px;
          }
        }
      }
      .article-comment-login{
        margin: 25px 0;
      }
      .article-comment-content-container {
        width: 100%;
        margin-bottom: 20px;
        .article-comment-content {
          @include flex-define(row, flex-start, flex-start);
          margin: 10px 0;
          .comment-parent-avatar {
          }
          .comment-parent-container {
            width: 100%;
            color: #cccccc;
            font-weight: 600;
            margin: 0 0 0 30px;
            .comment-parent-info {
              width: 100%;
              font-size: 14px;
              line-height: 1.8em;
              .comment-parent-author {
                cursor: pointer;
                &:hover {
                  color: $theme-color;
                  font-size: 14px;
                }
              }
              .comment-parent-content-text {
                font-size: 16px;
                color: $font-color;
                font-weight: 400;
              }
              .comment-parent-content-info {
                width: 100%;
                margin-left: -5px;
                font-weight: 400;
                @include flex-define(row, flex-start, center);
                .comment-parent-content-date,
                .comment-parent-content-agree,
                .comment-parent-content-disagree,
                .comment-parent-content-replay {
                  margin-right: 10px;
                  cursor: pointer;
                  padding: 0 5px;
                  &:hover {
                    color: $theme-color;
                    font-size: 14px;
                  }
                }
                .comment-parent-content-replay:hover {
                  border-radius: 3px;
                  background-color: #E5E9EF;
                }
              }
              .comment-children-container {
                margin: 10px 0;
                @include flex-define(row, flex-start, flex-start);
                .comment-children-info {
                  margin: -6px 0 0 10px;
                  .comment-children-author-content {
                    .comment-children-reply-content {
                      font-size: 16px;
                      color: $font-color;
                      font-weight: 400;
                    }
                  }
                  .comment-children-content-info {
                    font-weight: 400;
                    .comment-children-content-date,
                    .comment-children-content-agree,
                    .comment-children-content-replay {
                      margin-right: 10px;
                      cursor: pointer;
                      padding: 2px 5px;
                      &:hover {
                        color: $theme-color;
                        font-size: 14px;
                      }
                    }
                    .comment-children-content-replay:hover {
                      border-radius: 3px;
                      background-color: #E5E9EF;
                    }
                  }
                }
              }
            }
          }
        }
        .article-comment-publish {
          margin: 0 0 10px 80px;
          padding: 30px 0 40px 0;
          width: 90%;
        }
        .article-comment-common-line {
          width: 90%;
          margin-left: 80px;
          border-bottom: 1px solid #666;
        }
      }
    }
  }
</style>
