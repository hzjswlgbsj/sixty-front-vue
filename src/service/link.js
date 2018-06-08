/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/6/8
 * Time: 上午11:31
 */

import dataStore from '../data/index'
import linkApi from '../api/link'

export async function getLinks (refresh, type, id, page, limit) {
  if (refresh || dataStore.store('links').length === 0) {
    let links = await linkApi.all(type, id, page, limit)
    dataStore.store('links', links)
  }
  return dataStore.store('links')
}
