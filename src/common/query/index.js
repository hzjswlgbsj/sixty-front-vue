/**
 * @module packages/common/Query
 */
import qs from 'qs'

/**
 * 将对象转成&连接的字符串
 * @param {Object} obj
 * @returns {String}
 */
export function stringify (obj) {
  return qs.stringify(obj)
}

/**
 * 将&连接的字符串转成对象
 * @param {String} str
 * @returns {Object}
 */
export function parse (str) {
  return qs.parse(str)
}
