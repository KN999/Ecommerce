import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import store from '../store'; 
import routes from './routes'

export default function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const router = createRouter({
    history: createHistory(process.env.VUE_ROUTER_BASE),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
  })

  router.beforeEach((to, from, next) => {
    console.log("TO: "+JSON.stringify(to))
    console.log("FROM: "+JSON.stringify(from))
    if (to.meta.requiresAuth && !localStorage.getItem('authToken')) {
      next('/login');
    } else {
      next();
    }
  })

  return router
}
