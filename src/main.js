import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'vue-awesome/icons'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Icon from 'vue-awesome/components/Icon'
import VueTimeago from 'vue-timeago'
import VueLoading from 'vue-loading-template'
import animated from 'animate.css'
import sixtyModal from './my-plugin/sixty-modal/sixtyModal'

Vue.component('icon', Icon)
Vue.use(iView)
Vue.use(sixtyModal)
Vue.use(mavonEditor)
Vue.use(animated)
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

router.afterEach(() => {
  window.scrollTo(0, 0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
