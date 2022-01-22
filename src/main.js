import Vue from 'vue'
import App from './App.vue'
import '@/style/index.css'
import Notice from '@/utils/create.js'

// 引入自定义路由插件
import router from '@/myRouter'
// import router from '@/router'

import store from './myStore'
// import store from './store'

Vue.use(Notice)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')



/* 
1.弹性布局
display: flex;
容器属性：
  flex-direction: row|column|row-reverse|column-reverse
  flex-wrap: wrap|no-wrap|wrap-reverse
  justify-content: space-between|space-around|flex-start|flex-end|center|space-evenly
  align-items: space-between|space-around|flex-start|flex-end|center
元素属性：
  flex-grow: 0(以0倍的速率增长，默认为0，不增长)
  flex-shrink: 1(定义缩短比例，默认为1，不缩短)
  flex-basis: 100px|auto(定义初始宽度)
  align-self: space-between|space-around|flex-start|flex-end|auto

2.形变
transform
  transform: translate|rotate|scale|skew

3.过渡
transition: 需要过渡的属性 持续时间 速度曲线(linear|ease) 延迟时间

4.渐变
线性渐变
  background：linear-gradient(to bottom right, red 10%, yellow 30%, green 50%)从左上到右下，颜色从红色渐变到黄色





localStorage: setItem()|getItem()|removeItem()|clear()

sessionStorage: setItem()|getItem()|removeItem()|clear()

http 状态码：
  2XX：成功状态码
  3XX：重定向状态码，用来告诉客户端，访问的资源已经移动
    304：要客户端使用缓存
  4XX：客户端错误
    400：客户端发送了一个错误请求，请求数据错误，比如表单，cookie有错误
    401：未授权，需要客户端对自己认证
    403：forbidden,请求被服务器拒绝
    404：not found,未找到资源
    405：method not allowed,不支持的请求方法
    408：request timeout，请求超时，客户端完成的请求过长，服务器返回这个状态码关闭连接
  5XX：服务器错误
    500：内部服务器错误



















*/
