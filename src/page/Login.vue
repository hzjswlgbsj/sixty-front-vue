<template>
  <div class="test-login">
    跳转中...
  </div>
</template>

<script>
import dataStore from '../data/index'
import urlTool from '../util/url'
import weiboTokenApi from '../api/weibo/token'
import usersApi from '../api/users'

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
        dataStore.store('weiboCode', params.code)
        try {
          /* 通过code获取到access_token */
          let tokenInfo = await weiboTokenApi.getToken(params.code)
          console.log('tokenInfo', tokenInfo)
          if (tokenInfo && tokenInfo.access_token && tokenInfo.uid) {
            dataStore.setCookie('weibo_token', tokenInfo.access_token)
            dataStore.setCookie('weibo_uid', tokenInfo.uid)
            /* 通过access_token和uid获取微博用户的详细信息 */
            let userInfo = await weiboTokenApi.getUser(tokenInfo.access_token, parseInt(tokenInfo.uid))
            console.log('userInfo', userInfo)
            if (userInfo && userInfo.id === parseInt(tokenInfo.uid)) {
              /* 将获取到的微博用户信息注册到本应用的用户系统中去 */
              let userResult = await usersApi.all(userInfo.idstr)
              if (userResult && userResult.id) {
                dataStore.setCookie('userInformation', userResult)
              } else {
                /* 将获取到的微博用户信息注册到本应用的用户系统中去 */
                let registerResult = await usersApi.register(userInfo.screen_name, userInfo.profile_image_url, 1, userInfo.idstr)
                if (registerResult) {
                  this.$Message.success('授权成功')
                }
              }
            }
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        /* 通过用户授权得到下一步获取access_token接口所需要的code */
        window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${env.WEIBO_APPKEY}&response_type=code&redirect_uri=${env.WEIBO_REDIRECT}`
      }
    },
    async getUser () {

    }
  }
}
</script>

<style scoped>
  .test-login {
    color: #ffffff;
  }
</style>
