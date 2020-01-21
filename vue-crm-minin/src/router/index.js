import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () =>  import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () =>  import('../views/Register')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main'},
    component: () =>  import('../views/Categories')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: {layout: 'main'},
    component: () =>  import('../views/DetailRecord')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main'},
    component: () =>  import('../views/History')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main'},
    component: () =>  import('../views/Planning')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main'},
    component: () =>  import('../views/Profile')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main'},
    component: () =>  import('../views/Record')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
