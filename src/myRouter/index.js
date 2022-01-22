import Vue from 'vue'
import MyVueRouter from './my-vue-router'
import Home from '../views/Home.vue'

/* 
  1.如果插件是一个对象，必须提供install方法，
  2.如果是一个函数则会被视为install方法，install方法调用时，会将Vue作为参数传入
  3.必须在new Vue()之前被调用
*/
Vue.use(MyVueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: 'aboutChild1',
        name: 'aboutChild1',
        component: () => import('@/views/AboutChild1')
      },
      {
        path: 'aboutChild2',
        name: 'aboutChild2',
        component: () => import('@/views/AboutChild2')
      }
    ]
  }
]

const router = new MyVueRouter({
  routes
})

export default router
