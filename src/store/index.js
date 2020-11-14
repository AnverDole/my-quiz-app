import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Students from './modules/students'
import Exams from './modules/Exams'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Students,
    Exams
  }
})
