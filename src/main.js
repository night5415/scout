import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLocalForage from 'vue-localforage'
import pg from 'pathfinder-guid'
import './registerServiceWorker'


 

Vue.use(VueLocalForage)
Vue.use(pg)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
