/**
 * 获取滚动条距离顶部的高度
 * @returns {Object}
 * @constructor
 */
export function getScrollTop () {
  let [scrollTop, bodyScrollTop, documentScrollTop] = [0, 0, 0]
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}

/**
 * 获取滚动条现在的高度
 * @return {number}
 */
export function getScrollHeight () {
  let [scrollHeight, bodyScrollHeight, documentScrollHeight] = [0, 0, 0]
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
  return scrollHeight
}

/**
 * 获取文档的高度
 * @return {number}
 */
export function getWindowHeight () {
  let windowHeight = 0
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}
