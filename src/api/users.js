/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/4/28
 * Time: 上午10:31
 */
import http from '../util/http'

const module = {
  async all (mixinId, limit, page) {
    let [id, weiboUid] = [0, '']
    typeof mixinId === 'string' ? weiboUid = mixinId : id = mixinId
    let ret = await http.xpost('user.all', {
      id,
      weibo_uid: weiboUid,
      limit,
      page
    })
    return ret.data
  },
  async register (nickname, avatar, status, weiboUid) {
    let ret = await http.xpost('user.register', {
      nickname,
      avatar,
      status,
      weibo_uid: weiboUid
    })
    return ret.data
  }
}

export default module
