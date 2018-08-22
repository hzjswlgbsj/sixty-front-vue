<template>
  <div class="comment-container">
    <div class="article-comment">
      <div class="article-comment-total">{{total}}&nbsp;&nbsp;评论</div>
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
        <pagination
          :total="parseInt(total)"
          :current="currentCommentPage"
          :page-size="commentPageSize"
          @on-change="changePagination">
        </pagination>
      </div>
      <div class="article-comment-login">
        <logout-publish :reset-comment="resetComment" @publish-comment="publishComment(arguments, commentLevel.comment)" @handle-login="handleLogin" :login="login" :user="user"></logout-publish>
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
                    <icon name="thumbs-o-up" scale="0.8" style="vertical-align: middle" @click.native="handleAgree(comment.id, comment.like, comment)"></icon>
                    <span class="comment-parent-content-agree-number">{{comment.like}}</span>
                  </div>
                  <!--隐藏掉了点反赞，因为我希望和谐一点，有问题可以讨论-->
                  <div class="comment-parent-content-disagree" @click="handleDisagree">
                    <icon name="thumbs-o-down" scale="0.8" style="vertical-align: middle"></icon>
                    <span class="comment-parent-content-disagree-number">0</span>
                  </div>
                  <div class="comment-parent-content-replay" @click="handleReply(comment.id, comment.id, 0)">参与回复</div>
                </div>
                <!--二级评论开始-->
                <div class="comment-reply-container" v-if="comment.children && comment.children.length > 0">
                  <div class="comment-children-container" v-if="index < 3 || showMore" v-for="(reply, index) in comment.children" :key="reply.id">
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
                      <icon name="thumbs-o-up" scale="0.8" style="vertical-align: middle" @click.native="handleAgree(reply.id, reply.like, reply)"></icon>
                      <span class="comment-children-content-agree-number">{{reply.like}}</span>
                    </span>
                        <span class="comment-children-content-replay" @click="handleReply(comment.id, reply.id, reply.user_id)">回复</span>
                      </div>
                    </div>
                  </div>
                  <div class="comment-children-hide" v-if="!showMore && comment.childrenTotal > 3">
                    共<span class="comment-children-hide-total">{{comment.childrenTotal}}</span>条回复,
                    <span class="comment-children-hide-btn" @click="showMoreChildrenComment">点击查看</span>
                  </div>
                  <pagination
                    v-if="showMore && comment.childrenTotal > commentChildrenPageSize"
                    :total="parseInt(comment.childrenTotal)"
                    :current="currentChildrenCommentPage"
                    :page-size="commentChildrenPageSize"
                    @on-change="changeChildrenPagination(arguments, comment.id)">
                  </pagination>
                </div>
                <!--二级评论结束-->
              </div>
            </div>
          </div>
          <logout-publish
            class="article-comment-publish"
            v-if="childrenCommentComponent && currentCommentId === comment.id"
            :reset-comment="resetComment"
            :placeholder="placeholder"
            @publish-comment="publishComment"
            @handle-login="handleLogin"
            :login="login"
            :user="user">
          </logout-publish>
          <div class="article-comment-common-line"></div>
        </div>
        <!--最下面也加上分页和评论框-->
        <!--<div class="article-comment-pagination-bottom">
          <pagination :total="total" :current="currentCommentPage" :page-size="commentPageSize" @on-change="changePagination"></pagination>
        </div>
        <div class="article-comment-login">
          <logout-publish :reset-comment="resetComment" @publish-comment="publishComment(arguments, commentLevel.comment)" @handle-login="handleLogin" :login="login" :user="user"></logout-publish>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar'
import LogoutPublish from './LogoutPublish'
import Pagination from './Pagination'
import { redirectLogin } from '../router/index'
import { checkLogin, getCurrentUser, getUsers } from '../service/user'
import { remoteAddComment, remoteLike, remoteGetLike, remoteGetComment, remoteGetChildrenComment } from '../service/article'
import Const from '../const/index'

export default {
  name: 'comment',
  components: {
    'avatar': Avatar,
    'logout-publish': LogoutPublish,
    'pagination': Pagination
  },
  props: {
    commentData: {
      type: Array,
      default: function () {
        return []
      }
    },
    commentTotal: {
      type: Number,
      default: 0
    },
    articleId: {
      type: String,
      default: ''
    },
    articleTitle: {
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
    },
    discussType: {
      type: String,
      default: ''
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
      showMore: false,
      commentLevel: Const.ARTICLE_COMMENT_LEVEL,
      resetComment: false,
      placeholder: '',
      currentCommentId: 0,
      currentCommentPage: 1,
      currentChildrenCommentPage: 1,
      commentPageSize: Const.ARTICLE_COMMENT_PAGINATION,
      commentChildrenPageSize: Const.ARTICLE_CHILDREN_COMMENT_PAGINATION,
      commentType: this.discussType
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
    total () {
      return this.commentTotal
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
    async changePagination (page) {
      this.currentCommentPage = page
      if (this.currentArticleId === '0') {
        await remoteGetComment(true, this.currentArticleId, page, this.commentPageSize, 1, this.commentChildrenPageSize, this.commentType)
      } else {
        await remoteGetComment(true, this.currentArticleId, page, this.commentPageSize)
      }
    },
    async changeChildrenPagination (params, parentId) {
      this.currentChildrenCommentPage = params[0]
      await remoteGetChildrenComment(true, parentId, params[0], this.commentChildrenPageSize)
    },
    async publishComment (params, level) {
      let content = ''
      if (level === this.commentLevel.comment) {
        this.resetForm(level)
        content = params[0]
      } else {
        content = params
      }
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
      let email = ''
      try {
        let ret = await remoteAddComment(
          parseInt(this.currentArticleId),
          parseInt(this.user.id),
          content,
          this.commentForm.parentId,
          this.commentForm.replyId,
          this.commentForm.parentUserId,
          this.commentType,
          email,
          this.articleTitle
        )
        if (ret && ret.data) {
          this.$Message.success('你说的俺都听到了哦')
          this.refreshCommentData()
          this.resetComment = true
          this.resetForm()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleAgree (commentId, currentLikeCount, comment) {
      commentId = parseInt(commentId)
      currentLikeCount = parseInt(currentLikeCount)
      if (!this.login) {
        this.$Message.error('要先登录才能点赞哦，^_^')
        return
      }
      try {
        const likeData = await remoteGetLike(this.user.id, commentId)
        let likeCount = likeData && likeData.like ? parseInt(likeData.like) : 0
        const ret = await remoteLike(this.user.id, commentId)
        if (ret) {
          if (likeCount === 0) {
            this.$set(comment, 'like', currentLikeCount + 1)
          } else {
            this.$set(comment, 'like', currentLikeCount - 1)
          }
        } else {
          this.$Message.error('诶?手抖没成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleDisagree () {
      alert('哈哈，就不让你点反赞^_^')
    },
    async handleReply (parentId, replyId, replyUserId) {
      if (!this.login) {
        this.$Message.error('要先登录才能吐槽哦，^_^')
        return
      }
      this.commentForm.parentId = parseInt(parentId)
      this.commentForm.replyId = parseInt(replyId)
      this.commentForm.parentUserId = parseInt(replyUserId)
      if (this.currentCommentId === parentId) {
        this.childrenCommentComponent = !this.childrenCommentComponent
      }
      this.currentCommentId = parentId
      if (replyUserId !== 0) {
        let userData = await getUsers(true, parseInt(replyUserId))
        this.placeholder = userData ? `回复 @${userData.nickname}：` : '吐槽写得要优美，代码才会更丝滑~'
      } else {
        this.placeholder = '吐槽写得要优美，代码才会更丝滑~'
      }
    },
    resetForm (level) {
      if (level !== this.commentLevel.comment) {
        this.childrenCommentComponent = false
      }
      this.commentForm.parentId = 0
      this.commentForm.replyId = 0
      this.commentForm.replyUserId = 0
    },
    handleLogin () {
      let router = this.$route.path
      redirectLogin(router)
    },
    showMoreChildrenComment () {
      this.showMore = true
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
                @include cursor-hover-color;
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
                  padding: 0 5px;
                  @include cursor-hover-color;
                }
                .comment-parent-content-replay:hover {
                  @include cursor-hover-background;
                }
              }
              .comment-children-container {
                margin: 10px 0;
                @include flex-define(row, flex-start, flex-start);
                .comment-children-info {
                  margin: -6px 0 0 10px;
                  .comment-children-author-content {
                    .comment-children-reply-author {
                      color: $theme-color;
                    }
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
                      padding: 2px 5px;
                      @include cursor-hover-color;
                    }
                    .comment-children-content-replay:hover {
                      @include cursor-hover-background;
                    }
                  }
                }
              }
              .comment-children-hide {
                font-weight: 400;
                .comment-children-hide-total {
                  font-weight: 600;
                }
                .comment-children-hide-btn {
                  color: $theme-color;
                  padding: 2px 5px;
                }
                .comment-children-hide-btn:hover {
                  @include cursor-hover-background;
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
      .article-comment-pagination-bottom {
        display: flex;
      }
    }
  }
</style>
