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

Vue.component('icon', Icon)
Vue.use(iView)
Vue.use(mavonEditor)
Vue.use(Vuex)

Vue.config.productionTip = false

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
