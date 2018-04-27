'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN: '"http://api.sixtyden.com"',
  WEIBO_DOMAIN: '"https://api.weibo.com"',
  WEIBO_APPKEY: '"1979573568"',
  WEIBO_APPSECRET: '"6adce1e216516ad5f961be9a3cac70bc"',
  WEIBO_REDIRECT: '"http://www.sixtyden.com"'
})
