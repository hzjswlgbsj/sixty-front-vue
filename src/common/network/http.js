import axios from 'axios'
import qs from 'qs'
import { Message, Store } from '../index'

/**
 * post请求
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 */
function post (url, params) {
  return axios
    .post(url, qs.stringify(params), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      timeout: 20000
    })
    .catch(e => {
      Message.error('network error')
      Store.store('request', 'timeout')
      return Promise.reject({
        code: -1,
        msg: 'network error'
      })
    })
}

/**
 * 并发的发多个请求
 * @param {array} promises
 * @param {function} success
 */
function all (promises, success) {
  axios.all(promises).then(axios.spread(success))
}

export default {
  post,
  all
}
