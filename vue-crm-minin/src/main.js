import Vue from 'vue'
import Vuelidate from 'vuelidate'; // Плагин валидации форм https://vuelidate.js.org/
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter';
import messagePlugin from '@/utils/message.plugin';
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyAJwuLV47LcXAL5HggFjA-DAX2V-gEdOUg",
  authDomain: "vue-crm-minin-9b012.firebaseapp.com",
  databaseURL: "https://vue-crm-minin-9b012.firebaseio.com",
  projectId: "vue-crm-minin-9b012",
  storageBucket: "vue-crm-minin-9b012.appspot.com",
  messagingSenderId: "155415864637",
  appId: "1:155415864637:web:0e1782a0b327eb2e4d5154",
  measurementId: "G-661055DWHS"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
