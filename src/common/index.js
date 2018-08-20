/**
 * 通用模块
 * @module packages/common
 */

import * as storage from './storage'
import * as url from './url'
import * as query from './query'
import * as cookie from './cookie'

/**
 * 接口模块,主要封装了iview的message
 * @name Message
 */
export { default as Message } from './message'

/**
 * 接口模块,主要封装了请求
 * @name Api
 */
export { Api } from './api'

/**
 * 内存模块,主要封装了vuex的内存管理
 * @name Store
 */
export { default as Store } from './store'

/**
 * 持久存储,主要对localstorage进行封装
 * @name Storage
 */
export const Storage = storage

/**
 * 持久存储，可以跨域，主要对cookie进行封装
 * @name Cookie
 */
export const Cookie = cookie

/**
 * 地址处理，比如获取浏览器参数，urlencde，decode等
 * @name Url
 */
export const Url = url
/**
 * query处理，stringify和parse
 * @name Query
 */
export const Query = query

export { Http } from './network'
