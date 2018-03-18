export default {
  data () {
    return {
      curRouter: ''
    }
  },
  watch: {
    '$store.state.curRouter': {
      handler: function (newValue, oldValue) {
        this.curRouter = newValue.name
      },
      deep: true // 开启深度监听
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
