/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/4/28
 * Time: 上午10:31
 */
import http from '../util/http'

const module = {
  async all (id, limit, page) {
    let ret = await http.xpost('user.all', {
      id,
      limit,
      page
    })
    return ret
  },
  async register (nickname, avatar, status, weiboUid) {
    let ret = await http.xpost('user.register', {
      nickname,
      avatar,
      status,
      weibo_uid: weiboUid
    })
    return ret
  }
}

export default module
