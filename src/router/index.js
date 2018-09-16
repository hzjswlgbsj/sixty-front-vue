import Vue from 'vue'
import Router from 'vue-router'
import dataStore from '../data/index'
import Index from '../../src/page/layout/Index'
import Blog from '../../src/page/Blog'
import Tucao from '../../src/page/Tucao'
import Okami from '../../src/page/Okami'
import Trap from '../../src/page/Trap'
import Error from '../../src/page/Error'
import About from '../../src/page/About'
import ArticleDetail from '../../src/page/ArticleDetail'
import Login from '../../src/page/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/blog',
          name: 'Blog',
          component: Blog,
          children: [
            {
              path: 'articleDetail/:id',
              name: 'ArticleDetail',
              component: ArticleDetail
            }
          ]
        },
        {
          path: '/tucao',
          name: 'Tucao',
          component: Tucao
        },
        {
          path: '/okami',
          name: 'Okami',
          component: Okami
        },
        {
          path: '/trap',
          name: 'Trap',
          component: Trap
        },
        {
          path: '/error',
          name: 'Error',
          component: Error
        },
        {
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/login/:code',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  dataStore.store('curRouter', to.name)
  dataStore.store('currentComment', [])
  dataStore.store('links', [])
  next()
})

export function redirectLogin (loginBackRouter = '/') {
  dataStore.storage('loginBackRouter', loginBackRouter)
  router.push('/login/code')
}

export function redirectBack () {
  router.push(dataStore.storage('loginBackRouter'))
}

export default router
