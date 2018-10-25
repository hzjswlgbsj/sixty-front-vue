/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/4/28
 * Time: 上午10:31
 */
import { Api } from '../common'

const module = {
  async all (mixinId, limit, page) {
    let [id, weiboUid] = [0, '']
    if (parseInt(mixinId) > 99999) {
      weiboUid = mixinId
    } else {
      id = mixinId
    }

    let ret = await Api.call('user.all', {
      id,
      weibo_uid: weiboUid,
      limit,
      page
    })
    return ret.data
  },
  async register (nickname, avatar, status, weiboUid) {
    let ret = await Api.call('user.register', {
      nickname,
      avatar,
      status,
      weibo_uid: weiboUid
    })
    return ret.data
  }
}

export default module
