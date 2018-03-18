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

export default {
  store: _store,
  storage: _storage
}
