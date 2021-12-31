import Vue from 'vue'
import MyVuex from './MyVuex'

Vue.use(MyVuex)

export default new MyVuex.Store({
  state: {
    counter: 1,
    doubleCounter: 1
  },
  mutations: {
    add(state,params) {
      state.counter += params
    },
    doubleAdd(state,params) {
      state.doubleCounter += params
    }
  },
  actions: {
    asyncAdd({commit},params) {
        setTimeout(function(){
          commit('doubleAdd',params)
        },0)
    }
  },
  modules: {
  }
})