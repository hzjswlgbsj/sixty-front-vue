import { MENU_LIST } from '../const'

export default {
  data () {
    return {
      currentIdx: -1,
      menuList: MENU_LIST
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
