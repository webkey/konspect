// L09.5. Импортирование Firebase
import firebase from "firebase/app";
// L09.2. Создать новый модуль для Стора
export default {
  state: {
    info: {}
  },
  mutations: {
    // L09.8 Изменение state.info
    setInfo(state, info) {
      state.info = info
    },
    // L09.9 Очистка state.info, чтобы не было кеширования при логауте,
    // и данные разных пользователей не пересекались
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      // L09.10 Обработать ошибки, если возникнут при аснх. запросе
      try {
        // L09.4. Асинхронно получаем UID пользователя
        const uid = await dispatch('getUid');
        // L09.6. Запрос (аснх.) к Firebase для получения info по UID
        const info = (await firebase
                .database()
                .ref(`/user/${uid}/info`)
                .once('value')
        ).val();
        // L09.7. Изменить state.info через мутацию (исп. метод commit)
        commit('setInfo', info);
      } catch (e) {
        return false;
      }
    }
  },
  getters: {
    info: s => s.info
  }
}