/**
 * @module packages/common/Storage
 */

/**
 * 往localstorage中存或读数据
 * @param {string} key 存取的键值
 * @param {*} val 存的值，如果是undefined表示读
 */
export function storage (key, val) {
  let ciKey = 'sixtyden_' + process.env.NODE_ENV
  let envData = lstorage(ciKey)

  if (typeof val === 'undefined') {
    if (envData && envData[ciKey] && envData[ciKey][key]) {
      return envData[ciKey][key]
    } else {
      return null
    }
  } else {
    if (storage(key)) {
      envData[ciKey][key] = val
      lstorage(ciKey, envData)
    }

    if (!envData || typeof envData !== 'object') {
      envData = {}
    }

    if (!envData[ciKey]) {
      envData[ciKey] = {}
    }

    envData[ciKey][key] = val
    lstorage(ciKey, envData)
  }
}

/**
 * 往localstorage中存或读用户数据
 * @param {string} key 存取的键值
 * @param {*} val 存的值，如果是undefined表示读
 */
export function ustorage (key, val) {
  let userData = storage('user_data')
  const user = storage('user')
  let uid = user ? user.user_id : null

  if (!uid) {
    return null
  }

  if (typeof val === 'undefined') {
    if (userData && userData[uid] && userData[uid][key]) {
      return userData[uid][key]
    } else {
      return null
    }
  } else {
    if (ustorage(key)) {
      userData[uid][key] = val
      storage('user_data', userData)
    }

    if (!userData || typeof userData !== 'object') {
      userData = {}
    }

    if (!userData[uid]) {
      userData[uid] = {}
    }

    userData[uid][key] = val
    storage('user_data', userData)
  }
}

function lstorage (key, val) {
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
