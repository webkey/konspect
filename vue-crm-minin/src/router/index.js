import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
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
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () =>  import('../views/Home')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () =>  import('../views/Categories')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: () =>  import('../views/Detail')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () =>  import('../views/History')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: () =>  import('../views/Planning')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () =>  import('../views/Profile')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () =>  import('../views/Record')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Метод router.beforeEach() - это хук перехода по роуту
  // https://router.vuejs.org/ru/guide/advanced/navigation-guards.html#%D0%B3n%D0%BE%D0%B1%D0%B0n%D1%8C%D0%BD%D1%8B%D0%B5-%D1%85%D1%83%D0%BA%D0%B8-%D0%B4%D0%BE-%D0%BD%D0%B0%D0%B2%D0%B8%D0%B3%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D1%85-%D1%85%D1%83%D0%BA%D0%BE%D0%B2
  const currentUser = firebase.auth().currentUser
  // firebase.auth() - это объект firebase с данными по авторизации
  // firebase.auth().currentUser - объект с данными текущего пользователя
  // И если пользователь не авторизован, то поле firebase.auth().currentUser будет в значении null
  // https://firebase.google.com/docs/auth/web/manage-users?hl=ru
  const requireAuth = to.matched.some(record => record.meta.auth)
  // to.matched - это массив роутов относящихся к текущему URL (например, к /foo/bar могут относится две записи: как /foo/bar, так и /foo)
  // Метод .some() - это метод массива, который определяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции
  // То есть метод .some перебирает в цикле все роуты относящиеся к текущему URL, и если хотя бы один из них имеет поле meta.auth со значением true,
  // то вернет true, если нет, то вернет false
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/some

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
