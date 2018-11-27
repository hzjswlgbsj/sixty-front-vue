'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN: '"http://api.sixty.com"',
  WEIBO_DOMAIN: '"https://api.weibo.com"',
  WEIBO_APPKEY: '"1979573568"', // 改成你的
  WEIBO_APPSECRET: '"6adce1e216516ad5f961be9a3cac70bc"', // 改成你的
  WEIBO_REDIRECT: '"http://www.sixtyden.com/login"', // 改成你的
  WEIBO_GET_TOKEN_URL: '"https://api.weibo.com/oauth2/access_token"',
  WEIBO_GET_USER_URL: '"https://api.weibo.com/2/users/show.json"'
})
