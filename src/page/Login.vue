<template>
  <div class="test-login">
    跳转中...
  </div>
</template>

<script>
import dataStore from '../data/index'
import urlTool from '../util/url'
import weiboLoginApi from '../api/weibo/login'

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
      console.log('params', params)
      if (params.code) {
        dataStore.store('weiboCode', params.code)
        let ret = await weiboLoginApi.getToken(params.code)
        console.log(1111111111)
        console.log(ret)
        console.log(1111111111)
      } else {
        window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${env.WEIBO_APPKEY}&response_type=code&redirect_uri=${env.WEIBO_REDIRECT}`
      }
    }
  }
}
</script>

<style scoped>

</style>
