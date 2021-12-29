import Vue from 'vue'
import App from './App.vue'
import Notice from '@/utils/create.js'

Vue.use(Notice)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
