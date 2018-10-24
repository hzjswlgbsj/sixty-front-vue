import { Api } from '../common'

/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/6/8
 * Time: 上午11:11
 */
const module = {
  async all (type, id, page, limit) {
    let res = await Api.call('link.all', {
      type,
      id,
      page,
      limit
    })
    return res.data
  }
}

export default module
