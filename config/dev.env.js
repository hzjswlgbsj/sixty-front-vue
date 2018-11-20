'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN: '""', // 请换成你的
  WEIBO_DOMAIN: '""',
  WEIBO_APPKEY: '""', // 请换成你的
  WEIBO_APPSECRET: '""', // 请换成你的
  WEIBO_REDIRECT: '""', // 请换成你的
  WEIBO_GET_TOKEN_URL: '"https://api.weibo.com/oauth2/access_token"',
  WEIBO_GET_USER_URL: '"https://api.weibo.com/2/users/show.json"'
})
