import axios from 'axios'
import qs from 'qs'

const TAG = 'HTTP'

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
      timeout: 10000
    })
    .catch(e => {
      console.error(TAG, e)
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
