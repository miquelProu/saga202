import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefineixCampanya from './../defineixCampanya.vue';
import Confrontacions from './../confrontacions.vue';
import Campanya from './../campanya.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/confrontacions/:campanya/:torn/:isNew',
    name: 'confrontacions',
    component: Confrontacions,
  },
  {
    path: '/defineixCampanya',
    name: 'defineixCampanya',
    component: DefineixCampanya
  },
  {
    path: '/campanya',
    name: 'campanya',
    component: Campanya
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
