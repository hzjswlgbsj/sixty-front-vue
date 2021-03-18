import { MENU_LIST } from '../const'
import { cloneDeep } from 'lodash-es'

export default {
  data () {
    return {
      currentIdx: -1,
      menuList: cloneDeep(MENU_LIST)
    }
  },
  methods: {
    jump (router) {
      let routerArray = router.split('/') || []
      let routerString = ''
      for (let key in routerArray) {
        routerString += `/${routerArray[key]}`
      }
      this.$router.push({ path: routerString })
    }
  }
}
