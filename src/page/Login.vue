<template>
  <div class="test-login">
    跳转中...
  </div>
</template>

<script>
import { Cookie, Url } from '../common'
import weiboTokenApi from '../api/weibo/token'
import { register, login, checkRegister } from '../service/user'
import { redirectBack } from '../router/index'

const env = process.env

export default {
  name: 'login',
  data () {
    return {
      formCustom: {
        phone: '',
        password: '',
        code: ''
      }
    }
  },
  created () {
    this.weiboLogin()
  },
  methods: {
    async weiboLogin () {
      let params = Url.urlParams()
      if (params.code) {
        console.log('获取到了code', params.code)
        await this.getWeiboToken(params.code)
        const weiboAccessToken = Cookie.get('weibo_token')
        const weiboUid = Cookie.get('weibo_uid')
        if (!weiboAccessToken || !weiboUid) {
          console.log('从cookie中获取token和uid失败')
          this.$sixtyModal('你的微博账号状态异常哦')
          redirectBack()
        }
        let weiboUserInfo = await await this.getWeiboUser(weiboAccessToken, parseInt(weiboUid))
        console.log('获取微博用户信息', weiboUserInfo)
        if (!weiboUserInfo || weiboUserInfo.id !== parseInt(weiboUid)) {
          console.log('获取微博用户信息失败')
          this.$sixtyModal('拉取微博用户信息失败')
          redirectBack()
        }
        let checkRegisterRes = await checkRegister(weiboUserInfo.idstr)
        if (checkRegisterRes) {
          console.log('该用户已经注册')
          /* 如果已经注册的直接登录 */
          let res = await login(weiboUid)
          if (res) {
            this.$sixtyModal('登陆成功')
            redirectBack()
          }
        } else {
          /* 将获取到的微博用户信息注册到本应用的用户系统中去 */
          try {
            console.log('该用户没有注册，现在执行注册')
            let registerResult = await register(weiboUserInfo.screen_name, weiboUserInfo.profile_image_url, 1, weiboUserInfo.idstr)
            if (registerResult) {
              console.log('注册成功，进入登录流程')
              this.$sixtyModal('授权成功')
              let res = await login(weiboUserInfo.idstr)
              if (res) {
                this.$sixtyModal('登陆成功')
                redirectBack()
              }
            } else {
              this.$sixtyModal('授权失败')
              redirectBack()
            }
          } catch (e) {
            this.$sixtyModal('未知错误')
            redirectBack()
            console.log(e)
          }
        }
      } else {
        /* 通过用户授权得到下一步获取access_token接口所需要的code */
        window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${env.WEIBO_APPKEY}&response_type=code&redirect_uri=${env.WEIBO_REDIRECT}`
      }
    },

    /* 通过code获取到access_token */
    async getWeiboToken (code) {
      try {
        let tokenInfo = await weiboTokenApi.getToken(code)
        console.log('获取到了token', tokenInfo)
        if (tokenInfo && tokenInfo.access_token && tokenInfo.uid) {
          Cookie.set('weibo_token', tokenInfo.access_token)
          Cookie.set('weibo_uid', tokenInfo.uid)
        }
      } catch (e) {
        console.log(e)
      }
    },

    /* 通过access_token和uid获取微博用户的详细信息 */
    async getWeiboUser (weiboAccessToken, weiboUid) {
      try {
        let weiboUserInfo = await weiboTokenApi.getUser(weiboAccessToken, weiboUid)
        if (weiboUserInfo && weiboUserInfo.id) {
          Cookie.set('weiboUserInfo', JSON.stringify(weiboUserInfo))
          return weiboUserInfo
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
  .test-login {
    color: #ffffff;
  }
</style>
