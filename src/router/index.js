import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefineixCampanya from './../defineixCampanya.vue';
import Confrontacions from './../confrontacions.vue';
import Campanya from './../campanya.vue'
import Afegeix from './../afegeixUsers.vue';
import Login from '../views/login.vue';
import store from '../store/store.js'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/confrontacions/:campanya_id/:torn',
    name: 'confrontacions',
    component: Confrontacions,
    meta: { requiresAuth: true },
  },
  {
    path: '/defineixCampanya',
    name: 'defineixCampanya',
    component: DefineixCampanya,
    meta: { requiresAuth: true },
  },
  {
    path: '/campanya/:id',
    name: 'campanya',
    component: Campanya,
    meta: { requiresAuth: true },
  },
    {
    path: '/afegeix',
    name: 'afegeix',
    component: Afegeix,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guest: true },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLogged) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isLogged) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});





export default router
