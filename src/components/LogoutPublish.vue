<template>
  <div class="logout">
    <div class="logout-avatar">
      <avatar :src="login ? user.avatar : 'https://lib.sixtyden.com/default_avatar.jpg' " size="50px"></avatar>
    </div>
    <div class="logout-desc">
      <div class="logout-desc-login" v-if="login">
        <textarea v-model="commentContent" class="logout-desc-login-text" :placeholder="placeholder"></textarea>
      </div>

      <div class="logout-desc-logout" v-else>
        <div>
          微博
          <span class="logout-desc-logout-btn" @click="handleLogin">登录</span>
          后发表评论 (・ω・)
        </div>
      </div>

      <div class="comment-textarea-other-info">
        <div class="login-other-info" v-if="login">
          <Checkbox v-model="saveEmailNotice">接收邮件提醒</Checkbox>
          <transition
            enter-active-class='animated zoomIn'
            leave-active-class='animated zoomOut'>
            <Input class="login-other-info-email" v-if="saveEmailNotice" v-model="eMail" placeholder="请输入邮件地址" size="small" />
          </transition>
        </div>
        <div class="textarea-other-info-markdown">支持markdown语法哦 ~</div>
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
      commentContent: '',
      eMail: '',
      saveEmailNotice: false
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
    },
    placeholder: {
      type: String,
      default: '评论写得要优美，代码才会更丝滑。'
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
      if (!this.commentContent) {
        this.$sixtyModal('你似乎啥都没说哦~')
        return
      }

      if (!this.checkEmail()) return

      this.$emit('publish-comment', this.commentContent, this.eMail)
    },
    handleLogin () {
      this.$emit('handle-login')
    },
    checkEmail () {
      if (this.saveEmailNotice && !this.eMail) {
        this.$sixtyModal('请填写邮箱')
        return false
      }

      let eMailReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/

      if (this.saveEmailNotice && !eMailReg.test(this.eMail)) {
        this.$sixtyModal('你的邮箱不太对哦')
        return false
      }

      return true
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
          width: 100%;
          min-height: 55px;
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
          color: $logout-color;
          background-color: $theme-color;
          cursor: pointer;
          margin: 0 3px;
          &:hover {
            background-color: $hover-color;
            font-size: 14px;
          }
        }
      }
      .comment-textarea-other-info {
        font-size: $font-size;
        @include flex-define (row, space-between, center);
        .textarea-other-info-markdown {
          color: $theme-color;
        }
        /*margin-top: 10px;*/
        .login-other-info-email {
          width: 150px;
          color: #333333
        }
      }
    }
    .logout-comment-btn {
      background-color: $theme-color;
      color: $logout-color;
      width: 65px;
      height: 65px;
      /*flex-basis: 65px;*/
      border-radius: 5px;
      text-align: center;
      padding: 10px 12px;
      font-size: 15px;
      cursor: pointer;
      &:hover {
        background-color: $hover-color;
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

  /*响应式布局开始*/
  @media screen and (max-width: 767px) {
    .logout-desc {
      height: 45px !important;
      margin: 0 10px 0 0 !important;
      .logout-desc-logout {
        height: 45px !important;
      }
      .logout-desc-login-text {
        min-height: 30px !important;
      }
      .textarea-other-info-markdown {
        display: none !important;
      }
    }
    .logout-comment-btn {
      width: 50px !important;
      height: 45px !important;
      font-size: 12px !important;
      padding: 5px 5px 0 5px !important;
    }
    .login-other-info-email {
      width: 150px !important;
    }
  }
</style>
