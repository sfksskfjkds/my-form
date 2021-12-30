import Vue from 'vue'
import App from './App.vue'
import '@/style/index.css'
import Notice from '@/utils/create.js'
// 引入自定义路由插件
import router from '@/myRouter'
// import router from '@/router'

Vue.use(Notice)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$router1 = router
  }
}).$mount('#app')
