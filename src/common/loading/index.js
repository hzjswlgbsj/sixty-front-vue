/**
 * 消息模块,主要封装了iview的Loading模块，用于在非vue环境中调用消息接口
 * @module common/Loading
 */

import { LoadingBar } from 'iview'

export default {
  /**
   * 显示正在加载条
   * @function
   * @name start
   */
  start () {
    LoadingBar.start()
  },
  /**
   * 显示加载完成条
   * @function
   * @name finish
   */
  finish () {
    LoadingBar.finish()
  },
  /**
   * 显示加载出错条
   * @function
   * @name error
   */
  error () {
    LoadingBar.error()
  }
}
