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
    }
  },
  actions: {
    asyncAdd({commit},params) {
      setTimeout(() => {
        commit('add',params)
      },1000)
    }
  },
  modules: {
  }
})
