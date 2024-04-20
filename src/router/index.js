import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefineixCampanya from './../defineixCampanya.vue';
import Confrontacions from './../confrontacions.vue';
import Campanya from './../campanya.vue'
import Afegeix from './../afegeixUsers.vue';

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/confrontacions/:campanya_id/:torn',
    name: 'confrontacions',
    component: Confrontacions,
  },
  {
    path: '/defineixCampanya',
    name: 'defineixCampanya',
    component: DefineixCampanya
  },
  {
    path: '/campanya/:id',
    name: 'campanya',
    component: Campanya
  },
    {
    path: '/afegeix',
    name: 'afegeix',
    component: Afegeix
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
