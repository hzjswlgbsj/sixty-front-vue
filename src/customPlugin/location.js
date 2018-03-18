export default {
  install (Vue) {
    Vue.directive('location', {
      update (el, binding, vnode) {
        console.log('update-el', el)
        console.log('update-binding', binding)
        console.log('update-vnode', vnode)
      }
    })
  }
}
