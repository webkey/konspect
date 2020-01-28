<template>
  <form @submit.prevent="submit">
    <input type="text" placeholder="title" v-model="title">
    <input type="text" placeholder="body" v-model="body">
    <button type="submit">Create Post</button>
  </form>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "PostForm",
    data: () => ({
      title: '',
      body: ''
    }),
    methods: {
      // Чтобы воспользоваться методом mapMutations из Vuex,
      // нужно применить оператор spread (...)
      ...mapMutations(['createPost']),

      submit() {
        // В этом методе нужно изменить Стейт с новым значением поста.

        // Для этого будем использовать Мутации, т.к это синхронная операция (без обращения к серверу).

        // Суть примера с добавление нового поста - показать,
        // что после применения Мутаци к Стейту АВТОМТИЧЕСКИ
        // запустятся Геттеры и изменять Представление приложения

        // this.$store.commit('createPost', {title: this.title, body: this.body})
        // Но вместо этой строки можно использовать метода mapMutations
        this.createPost({
          title: this.title,
          body: this.body,
          id: Date.now()
        });

        this.title = this.body = '';
      }
    }
  };
</script>

<style scoped>
  form {
    max-width: 240px;
    margin: 0 auto;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
</style>