/*Здесь содержится вся логика, которая относится к авторизации, регистрации и выходу из системы*/
import firebase from 'firebase/app'
export default {
  actions: {
    // Экшн (асинхронный) для входа в систему
    async login({commit}, {email, password}) { // {контекст}, {поля}
     try {
       await firebase.auth().signInWithEmailAndPassword(email, password);
     } catch (e) {
       // Вызов мутации setError (store/index.js) во время возникновения ошибки
       // Метод commit позволяет изменять state (store/index.js)
       commit('setError', e);
       throw e;
     }
    },
    // Экшн (асинхронный) для регистрации нового пользователя
    async register({dispatch, commit}, {email, password, name}) { // {контекст - методы внутри vuex (?)}, {поля которые передаются как параметр при вызове этого метода}
     try {
       // Создать пользователя
       await firebase.auth().createUserWithEmailAndPassword(email, password);
       // Получить uid. Через метод dispatch, так как обращени идет к экшину (getUid - созданный нами) во vuex.
       const uid = await dispatch('getUid');
       // Сделать запись в базе данных:
       // 1) Идет обращение к модулю database() в firebase
       // 2) по указанному пути .ref()
       // 4) и создается поле .set()
       // 5) активируем базу данных в консоле firebase (Develop/Database см. https://youtu.be/yE4VxlZhdFk?list=PLqKQF2ojwm3njNpksFCi8o-_c-9Vva_W0&t=441)
       await firebase.database().ref(`/user/${uid}/info`).set({
         bill: 1000,
         name // сокращение от name: name
       });
     } catch (e) {
       commit('setError', e);
       throw e;
     }
    },
    // Экшн (синхронный) для получения id пользователя из базы firebase
    getUid() {
      const user = firebase.auth().currentUser;
      // Вернуть uid, если пользователь существует
      return user ? user.uid : null;
    },
    // Экшн (асинхронный) для выхода из системы
    async logout({commit}) {
      await firebase.auth().signOut();
      // L09.11 Очищаем state.info после выхода из системы
      await commit('clearInfo');
      // console.log('logout');
    }
  }
}