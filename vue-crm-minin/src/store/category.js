import firebase from "firebase/app";

export default {
  actions: {
    async createCategory({dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/user/${uid}/categories`).push({title, limit});
        return {title, limit, id: category.key}
      } catch (e) {
        throw e;
      }
    }
  }
}