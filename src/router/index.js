import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Tracker from  '../views/Tracker.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Shibx Dashboard',
    component: Dashboard
  },
  {
    path: '/tracker',
    name: 'Shibx Tracker',
    component: Tracker
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
document.title = to.name
next()
})

export default router
