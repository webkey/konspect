import firebase from "firebase/app";

export default {
  actions: {
    async fetchCategories({dispatch}) {
      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/user/${uid}/categories`).once('value')).val() || {};

        console.log("categories: ", categories);
        const cats = Object.keys(categories).map(key => ({...categories[key], id: key}));
        console.log("cats: ", cats);
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
    }
  }
}