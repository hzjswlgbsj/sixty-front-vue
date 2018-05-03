/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/5/2
 * Time: 下午11:21
 */

/* 由于直接调用微博的接口会产生跨域，我又不想使用微博那个不好看的标签和按钮，所以不使用js sdk，选择在后端中转一次 */
import http from '../../util/http'

const env = process.env
const module = {
  /**
   * 获取token
   * @return {Promise<*>}
   */
  async getToken (code) {
    let ret = await http.xpost('token.get', {
      url: env.WEIBO_GET_TOKEN_URL,
      client_id: env.WEIBO_APPKEY,
      client_secret: env.WEIBO_APPSECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: env.WEIBO_REDIRECT
    })
    return ret
  },
  /**
   * 获取微博用户详情信息
   * @return {Promise<*>}
   */
  async getUser (accessToken, uid) {
    let ret = await http.xpost('token.user', {
      url: env.WEIBO_GET_USER_URL,
      access_token: accessToken,
      uid: uid
    })
    return ret
  }
}

export default module
