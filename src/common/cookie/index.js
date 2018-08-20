/**
 * @module packages/common/Cookie
 */
import Cookies from 'js-cookie'

/**
 * 设置cookie
 * @function
 * @name set
 * @param {string} key 键值
 * @param {*} val 存的值
 */
export function set (key, val) {
  const cookieDomain = process.env.COOKIE_DOMAIN
  if (!cookieDomain) {
    Cookies.set(key, val)
  } else {
    Cookies.set(key, val, { domain: cookieDomain })
  }
}

/**
 * 获取cookie
 * @function
 * @name get
 * @param {string} key 键值
 * @returns {*}
 */
export function get (key) {
  return Cookies.getJSON(key)
}

/**
 * 删除一个cookie
 * @function
 * @name remove
 * @param {string} key 键值
 */
export function remove (key) {
  const cookieDomain = process.env.COOKIE_DOMAIN
  if (!cookieDomain) {
    Cookies.remove(key)
  } else {
    Cookies.remove(key, { domain: cookieDomain })
    Cookies.remove(key, { domain: cookieDomain })
  }
}
