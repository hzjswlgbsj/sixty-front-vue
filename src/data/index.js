import store from '../data/store'

function _store (keys, val) {
  if (typeof val === 'undefined') {
    let keysTemp = keys.split('.')

    keys = []
    if (keysTemp.length > 2) {
      for (let i = 0; i < keysTemp.length; i++) {
        if (i > 1) {
          keys[1] = keys[1] + '.' + keysTemp[i]
        } else {
          keys[i] = keysTemp[i]
        }
      }
    } else {
      keys = keysTemp
    }

    return keys.reduce((v, k) => {
      if (v && v.hasOwnProperty(k)) {
        return v[k]
      } else {
        return null
      }
    }, store.state)
  } else {
    store.commit('set', {
      keys,
      val
    })
  }
}

function _storage (key, val) {
  if (typeof val === 'undefined') {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return null
    }
  } else {
    localStorage.setItem(key, JSON.stringify(val))
  }
}

function _setCookie (cname, cvalue, exdays = 1) {
  let date = new Date()
  date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + date.toGMTString()
  document.cookie = cname + '=' + cvalue + ';' + expires
  console.log('打印设置好了cookie的cookieArray', document.cookie)
}

function _getCookie (cname) {
  let name = cname + '='
  let cookieArray = document.cookie.split(';')
  for (let i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i].trim()
    if (c.indexOf(name) === 0) {
      console.log('打印获取cookie的cookieArray', cookieArray)
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export default {
  store: _store,
  storage: _storage,
  setCookie: _setCookie,
  getCookie: _getCookie
}
