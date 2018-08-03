import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import clazzManage from '@/pages/clazz/clazzManage'
import addClazz from '@/pages/clazz/addClazz'
import test1 from '@/pages/test1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/clazzManage',
      name: 'clazzManage',
      component: clazzManage
    },
    {
      path: '/test1',
      name: 'test1',
      component: test1
    },
    {
      path: '/addClazz',
      name: 'addClazz',
      component: addClazz
    }
  ]
})
