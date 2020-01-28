import Vue from 'vue'
// Импортирование стора с файла store/index.js
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false;

new Vue({
  // Добавление store в конструктор приложения
  store, // Сокращение от store: store
  render: h => h(App),
}).$mount('#app');
