/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/5/2
 * Time: 下午11:21
 */

/* 由于直接调用微博的接口会产生跨域，我又不想使用微博那个不好看的标签和按钮，所以不使用js sdk，选择在后端中转一次 */
import { Api } from '../../common'

const env = process.env
const module = {
  /**
   * 获取token
   * @param code
   * @return {Object}
   */
  async getToken (code) {
    let ret = await Api.call('token.get', {
      url: env.WEIBO_GET_TOKEN_URL,
      client_id: env.WEIBO_APPKEY,
      client_secret: env.WEIBO_APPSECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: env.WEIBO_REDIRECT
    })
    return ret.data
  },
  /**
   * 获取微博用户详情信息
   * @param accessToken
   * @param uid
   * @return {Object}
   */
  async getUser (accessToken, uid) {
    let ret = await Api.call('token.user', {
      url: env.WEIBO_GET_USER_URL,
      access_token: accessToken,
      uid: uid
    })
    return ret.data
  }
}

export default module
