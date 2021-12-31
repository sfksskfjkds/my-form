import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1,
    doubleCounter: 1
  },
  mutations: {
    add(state,params) {
      state.counter += params
    },
    doubleAdd(state,params) {
      state.doubleCounter += params*2
    }
  },
  actions: {
    asyncAdd({commit},params) {
      setTimeout(() => {
        commit('doubleAdd',params)
      },1000)
    }
  },
  modules: {
  }
})
