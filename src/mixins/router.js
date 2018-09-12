export default {
  data () {
    return {
      currentIdx: -1,
      menuList: [
        {key: 'blog', label: 'Blog'},
        {key: 'tucao', label: 'Tucao'},
        {key: 'okami', label: 'Okami'},
        {key: 'trap', label: 'Trap'},
        {key: 'about', label: 'About'}
      ]
    }
  },
  created () {
    this.handleRouterIdex()
  },
  methods: {
    jump (router) {
      let routerArray = router.split('/') || []
      let routerString = ''
      for (let key in routerArray) {
        routerString += `/${routerArray[key]}`
      }
      this.$router.push({ path: routerString })
    },
    handleRouterIdex () {
      this.menuList.map((item, index) => {
        console.log(222222, item.label === this.$route.name)
        this.currentIdx = item.label === this.$route.name ? index : -1
      })
    }
  }
}
