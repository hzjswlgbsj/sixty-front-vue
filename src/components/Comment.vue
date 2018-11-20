<template>
  <div class="comment-container">
    <div class="article-comment">
      <div class="article-comment-total" v-if="total">{{ total }}&nbsp;&nbsp;评论</div>
      <div class="article-comment-total" v-else>暂无吐槽</div>

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
              <avatar :src="comment.user_avatar" size="45px"></avatar>
            </div>
            <div class="comment-parent-container">
              <div class="comment-parent-info">
                <span class="comment-parent-author">{{comment.user_nickname}}</span>
                <div class="comment-parent-content-text" v-html="markdownIt(comment.content)"></div>
                <div class="comment-parent-content-info">
                  <div class="comment-parent-content-date">
                    吐槽于
                    <timeago :datetime="comment.create_time" :auto-update="60"/>
                  </div>
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
                      <avatar :src="reply.user_avatar" size="24px"></avatar>
                    </div>
                    <div class="comment-children-info">
                      <div class="comment-children-author-content">
                        <span class="comment-children-author">{{reply.user_nickname}}&nbsp;</span>
                        <span class="comment-children-reply" v-if="reply.reply_id !== reply.parent_id">&nbsp;回复&nbsp;</span>
                        <span class="comment-children-reply-author" v-if="reply.reply_id !== reply.parent_id">@{{reply.parent_user_nickname}}:</span>
                        <span class="comment-children-reply-content">{{reply.content}}</span>
                      </div>
                      <div class="comment-children-content-info">
                        <span class="comment-children-content-date">回复于 <timeago :datetime="reply.create_time" :auto-update="60"/></span>
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
        <div class="article-comment-pagination-bottom">
          <pagination :total="total" :current="currentCommentPage" :page-size="commentPageSize" @on-change="changePagination"></pagination>
        </div>
        <!--<div class="article-comment-login">-->
          <!--<logout-publish :reset-comment="resetComment" @publish-comment="publishComment(arguments, commentLevel.comment)" @handle-login="handleLogin" :login="login" :user="user"></logout-publish>-->
        <!--</div>-->
      </div>

      <div v-if="requestStatus === '' && articleReady" style="margin-top: 20px">
        <vue-loading
          type="spiningDubbles"
          color="#2BBC8A"
          :size="{ width: '30px', height: '30px' }" />
      </div>

      <div v-if="requestStatus ==='success' && comments && comments.length === 0" style="text-align: center; color: #333333">暂无吐槽哦</div>

      <div v-if="requestStatus ==='timeout' " style="text-align: center">你的网络不给力哦</div>
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
import { Store } from '../common'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

marked.setOptions({
  highlight: text => hljs.highlightAuto(text).value
})

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
    },
    articleReady: {
      type: Boolean,
      default: false
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
    requestStatus () {
      return Store.store('request')
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
      const [content, email] = params

      if (level === this.commentLevel.comment) this.resetForm(level)

      if (!this.login || !this.user || !this.user.id) {
        this.$sixtyModal('你还没登录哒~')
        return
      }

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
          this.$sixtyModal('你说的俺都听到了哦~')
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
        this.$sixtyModal('要先登录才能点赞哦，^_^')
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
          this.$sixtyModal('诶?手抖没成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleDisagree () {
      this.$sixtyModal('哈哈，就不让你点反赞^_^')
    },
    async handleReply (parentId, replyId, replyUserId) {
      if (!this.login) {
        this.$sixtyModal('要先登录才能吐槽哦，^_^')
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
      this.commentForm.parentUserId = 0
    },
    handleLogin () {
      let router = this.$route.path
      redirectLogin(router)
    },
    showMoreChildrenComment () {
      this.showMore = true
    },
    markdownIt (text) {
      return marked(text)
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
        border-bottom: 1px solid #333;
        font-size: 12px;
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
        margin: 25px 0 50px 0;
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
            margin-left: 30px;
            .comment-parent-info {
              width: 100%;
              font-size: 12px;
              line-height: 1.8em;
              .comment-parent-author {
                color: #2BBC8A;
                @include cursor-hover-color;
              }
              .comment-parent-content-text {
                font-size: 14px;
                color: #ffffff;
                font-weight: 400;
                line-height: 2em;
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
                  color: $font-other-color;
                  margin-right: 10px;
                  padding: 0 5px;
                  @include cursor-hover-color;
                }
                .comment-parent-content-replay:hover {
                  @include cursor-hover-background;
                }
              }
              .comment-children-container {
                margin: 20px 0;
                @include flex-define(row, flex-start, flex-start);
                .comment-children-info {
                  margin: -6px 0 0 10px;
                  .comment-children-author-content {
                    .comment-children-author{
                      color: #2BBC8A;
                    }
                    .comment-children-reply-author {
                      color: $theme-color;
                    }
                    .comment-children-reply-content {
                      font-size: 14px;
                      color: $font-color;
                      font-weight: 400;
                    }
                  }
                  .comment-children-content-info {
                    font-weight: 400;
                    .comment-children-content-date,
                    .comment-children-content-agree,
                    .comment-children-content-replay {
                      color: $font-other-color;
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
          border-bottom: 1px solid #333;
        }
      }
      .article-comment-pagination-bottom {
        display: flex;
        margin-top: 20px;
        margin-left: 20px;
        font-size: 12px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .comment-parent-container {
      margin-left: 12px !important;
    }
    .article-comment-common-line {
      margin-left: 40px !important;
    }
  }

</style>
