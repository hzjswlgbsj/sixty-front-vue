import Vue from 'vue'
import Router from 'vue-router'
import { Store, Storage } from '../common'
Vue.use(Router)

/* 由于路由比较少，所以就没有拆出去哦 */
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('../../src/page/layout/Index'),
      children: [
        {
          path: '/blog',
          name: 'Blog',
          component: () => import('../../src/page/Blog'),
          children: [
            {
              path: 'articleDetail/:id',
              name: 'ArticleDetail',
              component: () => import('../../src/page/ArticleDetail')
            }
          ]
        },
        {
          path: '/tucao',
          name: 'Tucao',
          component: () => import('../../src/page/Tucao')
        },
        {
          path: '/okami',
          name: 'Okami',
          component: () => import('../../src/page/Okami')
        },
        {
          path: '/archive',
          name: 'Archive',
          component: () => import('../../src/page/Archive')
        },
        {
          path: '/error',
          name: 'Error',
          component: () => import('../../src/page/Error')
        },
        {
          path: '/test',
          name: 'Test',
          component: () => import('../../src/page/Test')
        },
        {
          path: '/search',
          name: 'Search',
          component: () => import('../../src/page/Search'),
          props: (route) => ({ query: route.query.q })
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('../../src/page/Login')
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../../src/page/About')
    }
  ]
})

router.beforeEach((to, from, next) => {
  Store.store('curRouter', to.name)
  Store.store('currentComment', [])
  Store.store('links', [])

  const el = document.getElementById('content-container')
  if (el) {
    // 路由跳转回到顶部
    // chrome | firefox
    el.scrollTop = 0
    // safari
    el.pageYOffset = 0
  }
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
