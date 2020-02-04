import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
// L09.3. Импотируем модуль info. Подключить в modules
import info from './info'

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
  // L09.25 Реализуем Action для получения данных по валюте с fixer.io
  // Используется Action, так как во vuex через Action идет обращение к серверу
  // Ключ лежит в .env в корне. .env-файл позволяет скрывать приватные данные
  actions: {
    async fetchCurrency() {
      // L09.26  Нужно делать запрос к серверу. Можно исп. axias,
      // но так как все прилож. работает с Firebase, то будем исп. натив. метод fetch(),
      // L09.27 До .env-переменных получаем доступ с помощью метода process.env
      // Сохраняем в переменную полученный ключ
      const key = process.env.VUE_APP_FIXER;
      // L09.28 В метод fetch передадим url-адрес, который берем на dashboard сервися fixer.io
      // Модифицируем скоприованный url заменяя ключ на переменную key, a &format=1 на те валюты, которые будем исп.
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`);
      // L09.29 Необходимо распарсить те данные, которые пришли методом .json() и вернуть их
      return await res.json();
    }
  },
  // Методы в секции getters позволяют получать доступ к стейтам
  getters: {
    // Геттер error будет получать объект state, и возвращать поле error данного state;
    // Этот геттер будем испоьзовать, чтобы получать определенные сообщения об ошибке (в компоненте EmptyLayout.vue)
    error: state => state.error
  },
  modules: {
    auth, info
  }
})
