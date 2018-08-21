import Vue from 'vue'
import Router from 'vue-router'

// Our Route Components
import Dashboard from '@/components/Dashboard'
import Error404 from '@/components/Error404'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Logout from '@/components/Logout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/404',
      name: '404',
      component: Error404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
