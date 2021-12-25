<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <My-input v-model="msg"/>
    <p>{{msg}}</p>
  </div>
</template>

<script>
import MyInput from '@/components/Form/MyInput.vue'

export default {
  name: 'App',
  components: {
    MyInput
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
