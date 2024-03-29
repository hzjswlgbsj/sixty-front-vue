import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-awesome/icons'
// import 'mavon-editor/dist/css/index.css'
import Icon from 'vue-awesome/components/Icon'
import VueTimeago from 'vue-timeago'
import VueLoading from 'vue-loading-template'
import sixtyModal from './my-plugin/sixty-modal/sixtyModal'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import VueFullPage from 'vue-fullpage.js'

Vue.component('icon', Icon)
Vue.use(sixtyModal)
Vue.use(VueFullPage)
Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'zh-CN',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'ja': require('date-fns/locale/ja')
  }
})
Vue.use(VueLoading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render (h) {
    return h('App')
  }
})
