/**
 * Created by liulin on 2018/3/18.
 */
import axios from 'axios'
import qs from 'qs'
import filter from './filter.js'
import { Storage } from '../common'

const env = process.env
function getDomain (apiSource) {
  let domain = ''
  if (apiSource === 'weibo') {
    domain = env.WEIBO_DOMAIN
  } else {
    domain = env.API_DOMAIN
  }
  return domain
}

function apiToUrl (api) {
  let apiArr = api.split('.')
  let url = getDomain(apiArr[0])
  if (apiArr.length < 2) {
    console.log('错误的api' + api)
    return
  }
  if (apiArr.length === 2) {
    url = `${url}/${apiArr[0]}/${apiArr[1]}`
  }

  if (apiArr.length > 2) {
    if (apiArr[0] === 'weibo') {
      url = `${url}/${apiArr[1]}/${apiArr[2]}`
    } else {
      url = `${url}/${apiArr[0]}/${apiArr[1]}/${apiArr[2]}`
    }
  }
  return url
}

function getParams (params) {
  if (!params || typeof params !== 'object') {
    params = {}
  }

  let user

  try {
    user = Storage.storage('user')
  } catch (e) {}

  params.token = user ? user.token : ''
  return params
}

var module = {
  get: function (api, succ, err) {
    let url = apiToUrl(api)
    let params = getParams()
    axios.get(url, qs.stringify(filter.filterEmpty(params)), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      timeout: 20000
    }).then((response) => {
      let data = response.data
      if (data.ret === 1) {
        if (succ && typeof succ === 'function') {
          succ(data.data)
        }
      } else {
        if (err && typeof err === 'function') {
          err(data)
        } else {
          let msgs = []
          if (data && data.msg) {
            msgs = data.msg.split('|')
          }
          if (msgs.length > 1) {
            alert(msgs[0], msgs[1])
          } else {
            alert(data.msg)
          }
        }
      }
    }).catch(function (e) {
      if (err && typeof err === 'function') {
        err(e)
      } else {
        console.error(e)
      }
    })
  },
  post: function (api, _params, succ, err) {
    let url = apiToUrl(api)
    let params = getParams(_params)
    axios.post(url, qs.stringify(filter.filterEmpty(params)), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      timeout: 10000
    }).then((response) => {
      let data = response.data
      if (data.ret === 1) {
        if (succ && typeof succ === 'function') {
          succ(data)
        }
      } else {
        if (err && typeof err === 'function') {
          err(data)
        } else {
          let msgs = []
          if (data && data.msg) {
            msgs = data.msg.split('|')
          }
          if (msgs.length > 1) {
            alert(msgs[0], msgs[1])
          } else {
            alert(data.msg)
          }
        }
      }
    }).catch(function (e) {
      if (err && typeof err === 'function') {
        err(e)
      } else {
        console.error(e)
      }
    })
  },
  xget (api) {
    return new Promise(function (resolve, reject) {
      module.get(api, (data) => {
        resolve(data)
      }, (data) => {
        reject(data)
      })
    })
  },
  xpost (api, params) {
    return new Promise(function (resolve, reject) {
      module.post(api, params, (data) => {
        resolve(data)
      }, (data) => {
        reject(data)
      })
    })
  }
}
export default module
