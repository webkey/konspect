// [1] Импорт Vue.js
import Vue from 'vue'
// [2] Импорт Vuex.js
import Vuex from 'vuex'
// импорт модуля post.js
import post from './modules/post.js'

// [3] Подключение Vuex к Vue
Vue.use(Vuex);

// 1) Сформирование объкта стора с помощью Vuex Класса Store
// и экспортирование его из файла
// 2) Добавить объкт для приложения (в фале main.js)
// [4] Экспорт объекта Стора из файла
export default new Vuex.Store({
  // Vuex объект состоит из максимум 5-ти полей: actions, mutations, state, getters, modules
  // actions: {} - работа с бэкендом (с асинхроными запросами)
  // mutations: {} - функции, которые напрамую меняют store
  // state: {} - изначальные данные
  // getters: {} - получение и трансформирование данных из стора
  // См. ст. https://vuex.vuejs.org/ru/

  // modules: {} - декомпозиця (разделение) логики Стора
  // Модулями являются импортируемые объекты,
  // которые содержат (или могут содержать) и предают в Стор указанные выше поля
  modules: {
    post
  }
});