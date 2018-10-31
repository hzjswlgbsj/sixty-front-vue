/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/10/31
 * Time: 10:21 AM
 */
import Dialogs from './Dialogs'

const Toast = {
  install (Vue, options) {
    // 通过Vue的原型注册一个方法, 让所有实例共享这个方法
    Vue.prototype.$sixtyModal = (msg, duration = 2000) => {
      let DialogsConstruction = Vue.extend(Dialogs) // 生成一个Vue的子类,同时这个子类也就是组件
      let vm = new DialogsConstruction({
        el: document.createElement('div')
      })

      document.body.appendChild(vm.$el) // 并将此div加入全局挂载点内部

      vm.message = msg
      vm.show = true
      setTimeout(() => {
        vm.show = false
      }, duration)
    }
  }
}

export default Toast
