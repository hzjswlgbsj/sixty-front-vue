<template>
  <div class="logout">
    <div class="logout-avatar">
      <avatar :src="login ? user.avatar : 'http://ovrjw2my5.bkt.clouddn.com/default_avatar.jpg' " size="50px"></avatar>
    </div>
    <div class="logout-desc">
      <div class="logout-desc-login" v-if="login">
        <textarea v-model="commentContent" class="logout-desc-login-text" cols="80" rows="4" placeholder="吐槽写得要优美，代码才会更丝滑~"></textarea>
      </div>
      <div class="logout-desc-logout" v-else>
        <div>
          微博
          <span class="logout-desc-logout-btn" @click="handleLogin">登录</span>
          后发表评论 (・ω・)
        </div>
      </div>
    </div>
    <div class="logout-comment-btn" :class="login ? '' : 'logout-comment-btn-logout' " @click="publishComment">发表评论</div>
  </div>
</template>

<script>
import Avatar from './Avatar'

export default {
  name: 'logout-public',
  components: {
    'avatar': Avatar
  },
  data () {
    return {
      commentContent: ''
    }
  },
  props: {
    login: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    },
    resetComment: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    initStyle () {
      return {
      }
    }
  },
  watch: {
    resetComment (val) {
      if (val) {
        this.commentContent = ''
      }
    }
  },
  methods: {
    publishComment () {
      this.$emit('publish-comment', this.commentContent)
    },
    handleLogin () {
      this.$emit('handle-login')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin/baseMixin";
  @import "../style/base/base";
  .logout {
    width: 100%;
    height: 65px;
    @include flex-define (row, space-between, center);
    .logout-avatar {
      flex-basis: 50px;
    }
    .logout-desc {
      background-color: #F4F5F7;
      width: 82%;
      height: 65px;
      margin: 0 15px;
      border-radius: 5px;
      .logout-desc-login {
        .logout-desc-login-text {
          margin: 8px;
          height: 55px;
          z-index: auto;
          position: relative;
          line-height: normal;
          font-size: 12px;
          transition: none;
          background: transparent;
          border: none;  /*取消textarea的边框*/
          outline:none;  /*取消textarea获得焦点的样式*/
          resize: none;  /*取消textarea的其他样式*/
        }
      }
      .logout-desc-logout {
        @include flex-define (row, center, center);
        height: 65px;
        font-size: 14px;
        color: #333333;
        background-color: #cccccc;
        border-radius: 5px;
        .logout-desc-logout-btn {
          padding: 2px 5px;
          border-radius: 4px;
          color: #E6E9EF;
          background-color: $theme-color;
          cursor: pointer;
          margin: 0 3px;
          &:hover {
            background-color: #1BB5E5;
            font-size: 14px;
          }
        }
      }
    }
    .logout-comment-btn {
      background-color: $theme-color;
      color: #E6E9EF;
      width: 65px;
      height: 65px;
      flex-basis: 65px;
      border-radius: 5px;
      text-align: center;
      padding: 10px 12px;
      font-size: 15px;
      cursor: pointer;
      &:hover {
        background-color: #1BB5E5;
      }
    }
    .logout-comment-btn-logout {
      background-color: #cccccc;
      cursor: default;
      &:hover {
        background-color: #cccccc;
      }
    }
  }
</style>
