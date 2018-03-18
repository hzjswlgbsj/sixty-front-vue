import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Vuex from 'vuex'
import store from './data/store'
import location from './customPlugin/location'

Vue.component('icon', Icon)
Vue.use(iView)
Vue.use(Vuex)
Vue.use(location)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
