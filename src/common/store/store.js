import Vuex from 'vuex'
import STATE from './state'
import cloneDeep from 'lodash-es/cloneDeep'

const INIT_STATE = cloneDeep(STATE)

const store = new Vuex.Store({
  state: STATE,
  mutations: {
    clean (state) {
      for (let key in INIT_STATE) {
        state[key] = INIT_STATE[key]
      }
    },
    set (state, keysVal) {
      const key = keysVal.keys
      const val = keysVal.val
      let keys = key.split('.')
      let k

      for (let i = 0; i < keys.length; i++) {
        k = keys[i]
        if (i < keys.length - 1) {
          if (!state[k] || typeof state[k] !== 'object') {
            state[k] = {}
          }
          state = state[k]
        }
      }
      state[k] = val
    }
  }
})

export default store
