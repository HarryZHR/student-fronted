import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import clazzManage from '@/pages/clazz/clazzManage'
import addClazz from '@/pages/clazz/clazzAdd'
import viewClazz from '@/pages/clazz/clazzDetail'
import editClazz from '@/pages/clazz/clazzEdit'
import teacherManage from '@/pages/teacher/teacherManage'
import teacherAdd from '@/pages/teacher/teacherAdd'
import teacherDetail from '@/pages/teacher/teacherDetail'
import teacherEdit from '@/pages/teacher/teacherEdit'
import studentManage from '@/pages/student/studentManage'
import studentAdd from '@/pages/student/studentAdd'
import studentDetail from '@/pages/student/studentDetail'
import studentEdit from '@/pages/student/studentEdit'

Vue.use(Router);
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
    },
    {
      path: '/teacher-manage',
      name: 'teacherManagePage',
      component: teacherManage
    },
    {
      path: '/teacher-add',
      name: 'teacherAdd',
      component: teacherAdd
    },
    {
      path: '/teacher/:id/view',
      component: teacherDetail
    },
    {
      path: '/teacher/:id/edit',
      component: teacherEdit
    },
    {
      path: '/student-manage',
      name: 'studentManagePage',
      component: studentManage
    },
    {
      path: '/student-add',
      name: 'studentAddPage',
      component: studentAdd
    },
    {
      path: '/student/:id/view',
      component: studentDetail
    },
    {
      path: '/student/:id/edit',
      component: studentEdit
    }
  ]
})
