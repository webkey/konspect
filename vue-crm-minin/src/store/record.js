import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/user/${uid}/records`).push(record)
      } catch (e) {
        commit.setError(e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const records = (await firebase.database().ref(`/user/${uid}/records`).once('value')).val() || {};
        // records - это объект из ключей вида -M0oTyYS1TbVqsg054Wr (формируюстся в Firebase автоматически)
        return Object.keys(records).map(key => ({...records[key], id: key}));
        // Возвращаем не объект, а массив объектов. Было -M0oTyYS1TbVqsg054Wr: {key: value, ... и т.д.}, а стало [{key: value, ..., id: -M0oTyYS1TbVqsg054Wr и т.д.}]
        // То есть ключи из объекта records переносим в поле id объектов - элементов нового массива
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // 16.1/ Экшин получения одной отдельной записи по id этой записи.
    // В экшин id передается вторым параметром после {dispatch, commit}
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid');
        // 16.2/ В Firebase есть метод, который позволяет получить доступ к нужному элементу по его id
        // Этот метод называется .child(id), где id - id элемента
        const record = (await firebase.database().ref(`/user/${uid}/records`).child(id).once('value')).val() || {};
        // В полученный объкт добавляем значение id,
        // но возвращаем сам объект, а не массив, как в экшене fetchRecords
        // {...records, id: id}
        // запись "id: id" можно сократить до "id"
        return {...record, id};
        // Также нужно создать экшен для получения одной категории 16.3
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  }
}