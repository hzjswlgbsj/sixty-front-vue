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
  async authorized (client_id = env.WEIBO_APPKEY, redirect_uri = env.WEIBO_REDIRECT) {
    let ret = await http.xpost('weibo.oauth2.authorize', {
      client_id,
      redirect_uri
    })
    return ret
  }
}

export default module
