import Vue from 'vue'
import App from './App.vue'
// Router кроме файла router.js нужно импортировать и регистрировать в основном файле js
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
