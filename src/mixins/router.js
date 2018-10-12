import { MENU_LIST } from '../const'
import _ from 'lodash'

export default {
  data () {
    return {
      currentIdx: -1,
      menuList: _.cloneDeep(MENU_LIST)
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
