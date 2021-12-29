import Vue from 'vue'
import App from './App.vue'
import Notice from '@/utils/create.js'
// import router from '@/myRouter'
import router from '@/router'

Vue.use(Notice)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
