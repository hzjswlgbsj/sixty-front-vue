import Vue from 'vue'
import Router from 'vue-router'
import dataStore from '../data/index'
import Index from '../../src/page/layout/Index'
import Blog from '../../src/page/Blog'
import Tucao from '../../src/page/Tucao'
import Friend from '../../src/page/Friend'
import Resources from '../../src/page/Resources'
import About from '../../src/page/About'
import ArticleDetail from '../../src/page/ArticleDetail'
import Login from '../../src/page/Login'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
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
          path: '/friend',
          name: 'Friend',
          component: Friend
        },
        {
          path: '/resources',
          name: 'Resources',
          component: Resources
        },
        {
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
})

export function redirectLogin (loginBackRouter = '/') {
  dataStore.storage('loginBackRouter', loginBackRouter)
  router.push('/login')
}

export function redirectBack () {
  router.push(dataStore.storage('loginBackRouter'))
}

export default router
