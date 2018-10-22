/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/6/8
 * Time: 上午11:31
 */

import { Store } from '../common'
import linkApi from '../api/link'

export async function getLinks (refresh, type, id, page, limit) {
  if (refresh || Store.store('links').length === 0) {
    let links = await linkApi.all(type, id, page, limit)
    Store.store('links', links)
  }
  return Store.store('links')
}
