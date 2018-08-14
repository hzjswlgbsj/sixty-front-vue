import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'vue-awesome/icons'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Icon from 'vue-awesome/components/Icon'
import Vuex from 'vuex'
import store from './data/store'
import VueTimeago from 'vue-timeago'

Vue.component('icon', Icon)
Vue.use(iView)
Vue.use(mavonEditor)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'zh-CN', // Default locale
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'ja': require('date-fns/locale/ja')
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
