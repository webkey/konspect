import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Передавать определенные ошибки будем с помощью стейта error
    error: null
  },
  // mutations изменют стейты
  mutations: {
    // setError будет менять state.error
    // 1) первым параметром принимается state
    // 2) вторым параметром принимается текст ошибки (error)
    setError(state, error) {
      state.error = error
    },
    // clearError будет очищать state.error
    clearError(state) {
      state.error = null
    }
  },
  // Методы в секции getters позволяют получать доступ к стейтам
  getters: {
    // Геттер error будет получать объект state, и возвращать поле error данного state;
    // Этот геттер будем испоьзовать, чтобы получать определенные сообщения об ошибке (в компоненте EmptyLayout.vue)
    error: state => state.error
  },
  modules: {
    auth
  }
})
