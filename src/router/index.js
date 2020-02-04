import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login')
    },
    {
      path: '/',
      name: 'index',
      redirect: '/bottomnav/index'
    },
    {
      path: '/bottomnav',
      name: 'bottomNav',
      component: () => import('../components/bottomNav'),
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('../components/index')
        },
        {
          path: 'cart',
          name: 'cart',
          meta: {
            requireAuth:true
          },
          component: () => import('../components/cart')
        },
        {
          path: 'list',
          name: 'list',
          component: () => import('../components/list')
        },
        {
          path: 'center',
          name: 'center',
          meta: {
            requireAuth:true
          },
          component: () => import('../components/center')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login')
    },
  ]
})
