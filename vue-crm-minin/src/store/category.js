import firebase from "firebase/app";

export default {
  actions: {
    async fetchCategories({dispatch}) {
      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/user/${uid}/categories`).once('value')).val() || {};

        return Object.keys(categories).map(key => ({...categories[key], id: key}));
      } catch (e) {
        throw e;
      }
    },
    // 16.3/ Экшин получения одной отдельной категории по id этой категории.
    // Логика работы этого экшена аналогична экшену fetchRecordById 16.1
    async fetchCategoryById({dispatch}, id) {
      try {
        const uid = await dispatch('getUid');
        const category = (await firebase.database().ref(`/user/${uid}/categories`).child(id).once('value')).val() || {};

        return {...category, id};
      } catch (e) {
        throw e;
      }
    },
    async createCategory({dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/user/${uid}/categories`).push({title, limit});
        return {title, limit, id: category.key}
      } catch (e) {
        throw e;
      }
    },
    async updateCategory({commit, dispatch}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/user/${uid}/categories`).child(id).update({title, limit});
      } catch (e) {
        commit('setError', e)
        throw e;
      }
    }
  }
}