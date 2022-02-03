import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { getStore, setStore ,removeStore} from '../utils/utils.js'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/reguser',
    component: () => import(/* webpackChunkName: "user" */ '../views/Reguser.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "user" */ '../views/Login.vue')
  },
  {
    path: '/userinfo',
    component: () => import(/* webpackChunkName: "user" */ '../views/Userinfo.vue')
  },
  {
    path: '/article',
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue'),
    children:[
      {
        path:'add',
        component: () => import(/* webpackChunkName: "article" */ '../views/AddArticle.vue'),
        meta: {
          login_require: true,
        },
      },
      {
        path:'my',
        component: () => import(/* webpackChunkName: "article" */ '../views/MyContent.vue'),
        meta: {
          login_require: true,
        },
      },
      {
        path:'edit/:id',
        props:true,
        component: () => import(/* webpackChunkName: "article" */ '../views/EditContent.vue'),
        meta: {
          login_require: true,
        },
      },
      {
        path:'info/:id',
        props:true,
        component: () => import(/* webpackChunkName: "article" */ '../views/Content.vue'),
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
