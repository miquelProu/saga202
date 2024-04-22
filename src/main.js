import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store/store.js'
import VueMq from 'vue-mq'

Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    mobile: 768,
    table: 1023,
    desktop: 1215,
    widescreen: 1407,
    fullhd: Infinity,
  },
  defaultBreakpoint: 'mobile' // customize this for SSR
})

new Vue({
  router,
  store: Store,
  render: h => h(App)
}).$mount('#app')
