import { MENU_LIST } from '../const'
import { cloneDeep } from 'lodash-es'

export default {
  data () {
    return {
      curRouteName: '',
      menuList: cloneDeep(MENU_LIST)
    }
  },
  watch: {
    '$route.name' (name) {
      this.curRouteName = name
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
  },
  mounted () {
    this.curRouteName = this.$route.name
  }
}
