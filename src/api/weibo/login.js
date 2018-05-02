/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/4/26
 * Time: 下午11:28
 */
import http from '../../util/http'

const env = process.env
const module = {
  /**
   * 请求用户授权
   * @return {Promise<*>}
   */
  async authorized () {
    let ret = await http.xpost('weibo.oauth2.authorize', {
      client_id: env.WEIBO_APPKEY,
      redirect_uri: env.WEIBO_REDIRECT
    })
    return ret
  },
  async getToken (code) {
    let ret = await http.xpost('weibo.oauth2.access_token', {
      client_id: env.WEIBO_APPKEY,
      client_secret: env.WEIBO_APPSECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: env.WEIBO_REDIRECT
    })
    return ret
  },
  async getUserInfo (accessToken, uid) {
    let ret = await http.xpost('weibo.oauth2.access_token', {
      access_token: accessToken,
      uid
    })
    return ret
  }
}

export default module
