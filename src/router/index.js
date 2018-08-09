import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import clazzManage from '@/pages/clazz/clazzManage'
import addClazz from '@/pages/clazz/addClazz'
import viewClazz from '@/pages/clazz/clazzDetail'
import editClazz from '@/pages/clazz/clazzEdit'
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
      name: 'homePage',
      component: home
    },
    {
      path: '/clazz-manage',
      name: 'clazzManagePage',
      component: clazzManage
    },
    {
      path: '/test1',
      name: 'test1',
      component: test1
    },
    {
      path: '/add-clazz',
      name: 'addClazzPage',
      component: addClazz
    },
    {
      path: '/clazz/:id/view',
      component: viewClazz
    },
    {
      path: '/clazz/:id/edit',
      component: editClazz
    }
  ]
})
