/**
 * 消息模块,主要封装了iview的Messge模块，用于在非vue环境中调用消息接口
 * @module packages/common/Message
 */

import { Message } from 'iview'

export default {
  /**
   * 弹出错误消息
   * @function
   * @name error
   * @param {string} msg 消息字符串
   */
  error (msg) {
    Message.error(msg)
  },
  /**
   * 弹出成功消息
   * @function
   * @name success
   * @param {string} msg 消息字符串
   */
  success (msg) {
    Message.success(msg)
  },
  /**
   * 弹出警告消息
   * @function
   * @name warn
   * @param {string} msg 消息字符串
   */
  warn (msg) {
    Message.warning(msg)
  }
}
