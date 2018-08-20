/**
 * @module packages/common/Url
 */
import { Query } from '../index'

/**
 * 获取所有地址参数
 * @returns {Object}
 */
export function urlParams () {
  var url = location.search
  var theRequest = {}

  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    var strs = str.split('&')

    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}

/**
 * 浏览器参数编码urlencode
 * @param str
 * @returns {string}
 */
export function urlEncode (clearString) {
  var output = ''
  var x = 0

  clearString = utf16to8(clearString.toString())
  var regex = /(^[a-zA-Z0-9-_.]*)/

  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x))
    if (match != null && match.length > 1 && match[1] !== '') {
      output += match[1]
      x += match[1].length
    } else {
      if (clearString[x] === ' ') output += '+'
      else {
        var charCode = clearString.charCodeAt(x)
        var hexVal = charCode.toString(16)
        output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase()
      }
      x++
    }
  }

  function utf16to8 (str) {
    var out, i, len, c

    out = ''
    len = str.length
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i)
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i)
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f))
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
      }
    }
    return out
  }

  return output
}

/**
 * 浏览器参数解码urldecode
 * @param str
 * @returns {string}
 */
export function urlDecode (encodedString) {
  var output = encodedString
  var binVal, thisString
  var myregexp = /(%[^%]{2})/
  var match

  function utf8to16 (str) {
    var out, i, len, c
    var char2, char3

    out = ''
    len = str.length
    i = 0
    while (i < len) {
      c = str.charCodeAt(i++)
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          out += str.charAt(i - 1)
          break
        case 12:
        case 13:
          char2 = str.charCodeAt(i++)
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
          break
        case 14:
          char2 = str.charCodeAt(i++)
          char3 = str.charCodeAt(i++)
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          )
          break
      }
    }
    return out
  }

  while (
    (match = myregexp.exec(output)) != null &&
    match.length > 1 &&
    match[1] !== ''
  ) {
    binVal = parseInt(match[1].substr(1), 16)
    thisString = String.fromCharCode(binVal)
    output = output.replace(match[1], thisString)
  }

  // output = utf8to16(output);
  output = output.replace(/\\+/g, ' ')
  output = utf8to16(output)
  return output
}

/**
 * 根据hash，路径和参数生成url地址
 * @param {String} hash hash值
 * @param {String} url 访问路径
 * @param {Object} params Get参数
 */
export function generateUrl (hash, url, params) {
  let href = url
  if (params) {
    href = `${url}?${Query.stringify(params)}`
  }
  return `${href}#${hash}`
}
