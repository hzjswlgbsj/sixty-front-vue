import http from '../util/http'

/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/6/8
 * Time: 上午11:11
 */
const module = {
  async all (type, id, page, limit) {
    let res = await http.xpost('link.all', {
      type,
      id,
      page,
      limit
    })
    return res
  }
}

export default module
