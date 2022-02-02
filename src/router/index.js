import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { getStore, setStore ,removeStore} from '../utils/utils.js'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/reguser',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reguser.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/userinfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Userinfo.vue')
  },
  {
    path: '/article',
    component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue'),
    children:[
      {
        path:'add',
        component: () => import(/* webpackChunkName: "about" */ '../views/AddArticle.vue'),
        meta: {
          login_require: true,
        },
      },
      {
        path:'my',
        component: () => import(/* webpackChunkName: "about" */ '../views/MyContent.vue'),
        meta: {
          login_require: true,
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (to.meta.login_require && !getStore('token')) {
    console.log('ddd')
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})
export default router
