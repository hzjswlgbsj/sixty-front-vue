import Vue from 'vue'
import Router from 'vue-router'
import { Store, Storage } from '../common'
import Index from '../../src/page/layout/Index'
import Blog from '../../src/page/Blog'
import Tucao from '../../src/page/Tucao'
import Okami from '../../src/page/Okami'
import Trap from '../../src/page/Trap'
import Error from '../../src/page/Error'
import About from '../../src/page/About'
import ArticleDetail from '../../src/page/ArticleDetail'
import Login from '../../src/page/Login'
import Search from '../../src/page/Search'
import Test from '../../src/page/Test'

Vue.use(Router)

/* 由于路由比较少，所以就没有拆出去哦 */
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
          path: '/search',
          name: 'Search',
          component: Search,
          props: (route) => ({ query: route.query.q })
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})

router.beforeEach((to, from, next) => {
  Store.store('curRouter', to.name)
  Store.store('currentComment', [])
  Store.store('links', [])
  next()
})

export function redirectLogin (loginBackRouter = '/') {
  Storage.storage('loginBackRouter', loginBackRouter)
  router.push('/login')
}

export function redirectBack () {
  router.push(Storage.storage('loginBackRouter'))
}

export default router
