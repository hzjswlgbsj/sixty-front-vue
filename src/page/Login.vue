<template>
  <div class="test-login">
    跳转中...
  </div>
</template>

<script>
import dataStore from '../data/index'
import urlTool from '../util/url'
import weiboTokenApi from '../api/weibo/token'
import { getUsers, register, login } from '../service/user'
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
      let params = urlTool.getRequest()
      if (params.code) {
        await this.getWeiboToken(params.code)
        const weiboAccessToken = dataStore.getCookie('weibo_token')
        const weiboUid = dataStore.getCookie('weibo_uid')
        if (weiboAccessToken && weiboUid) {
          let weiboUserInfo = await await this.getWeiboUser(weiboAccessToken, parseInt(weiboUid))
          if (weiboUserInfo && weiboUserInfo.id === parseInt(weiboUid)) {
            let checkRegister = await this.checkRegister(weiboUserInfo.idstr)
            if (checkRegister) {
              /* 如果已经注册的直接登录 */
              let res = await login(weiboUid)
              if (res) {
                this.$Message.success('登陆成功')
                redirectBack()
              }
            } else {
              /* 将获取到的微博用户信息注册到本应用的用户系统中去 */
              try {
                let registerResult = await register(weiboUserInfo.screen_name, weiboUserInfo.profile_image_url, 1, weiboUserInfo.idstr)
                if (registerResult) {
                  this.$Message.success('授权成功')
                }
              } catch (e) {
                console.log(e)
              }
            }
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
        console.log('tokenInfo', tokenInfo)
        if (tokenInfo && tokenInfo.access_token && tokenInfo.uid) {
          dataStore.setCookie('weibo_token', tokenInfo.access_token)
          dataStore.setCookie('weibo_uid', tokenInfo.uid)
        }
      } catch (e) {
        console.log(e)
      }
    },

    /* 通过access_token和uid获取微博用户的详细信息 */
    async getWeiboUser (weiboAccessToken, weiboUid) {
      try {
        let weiboUserInfo = await weiboTokenApi.getUser(weiboAccessToken, weiboUid)
        console.log('weiboUserInfo', weiboUserInfo)
        if (weiboUserInfo && weiboUserInfo.id) {
          dataStore.setCookie('weiboUserInfo', JSON.stringify(weiboUserInfo))
          return weiboUserInfo
        }
      } catch (e) {
        console.log(e)
      }
    },

    /* 用获取到的uid去数据库查看是否已经注册 */
    async checkRegister (weiboUid) {
      try {
        let user = await getUsers(true, weiboUid)
        if (user && user.id) {
          return true
        }
        return false
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
