import Vue from 'vue'
import Vuelidate from 'vuelidate'; // Плагин валидации форм https://vuelidate.js.org/
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter';
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');