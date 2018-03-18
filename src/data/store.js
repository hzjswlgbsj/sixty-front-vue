import Vue from 'vue'
import Vuex from 'vuex'
import STATE from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: STATE,
  mutations: {
    set (state, keysVal) {
      let tmp = state
      let keysTemp = keysVal.keys.split('.')

      let keys = []
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

      keys.map((key, idx) => {
        if (idx === keys.length - 1 || idx === 1) {
          tmp[key] = keysVal.val
        } else {
          tmp[key] = {}
          tmp = tmp[key]
        }
      })
    },
    // ----------------------- 全局显示 -----------------------
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    },
    showDialog (state, data) {
      if (!data || !data.key || typeof data.msg === 'undefined') {
        return
      }

      state[data.key] = data.msg
    }
  },
  getters: {}
})

window.$store = store
export default store
