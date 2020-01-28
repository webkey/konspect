<template>
  <div id="app">
    <Postform />
    <!--БЕЗ VUEX: v-for="post of posts"-->
    <!--С VUEX: v-for="post of allPosts"-->
    <h1>{{countPost}}</h1>
    <div class="post" v-for="post of allPosts" :key="post.id">
      <h2>{{post.title}}</h2>
      <p>{{post.body}}</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  // Функция mapGetters позволяет "смапить" Геттеры из Стора
  // Функция mapActions позволяет "смапить" Экшены из Стора
  import Postform from './components/PostForm'

  export default {
    name: 'app',
    // БЕЗ VUEX
    // data: () => ({
    //   posts: []
    // }),
    // БЕЗ VUEX: Получение данных с сервера?
    // БЕЗ VUEX: Оператор async добавляет возможность работать с асинхронными запросами
    async mounted() {
      // БЕЗ VUEX: Метод (нативный) **fetch** возвращает Промис.
      // БЕЗ VUEX: Чтобы "подождать" данные с сервера, исп. оператор **await** (к родител. функции должен быть применет оператор **async**)
      // const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3'); // Ссылка сгенерирована сервисом jsonplaceholder.typicode.com
      // БЕЗ VUEX: Чтобы получить данные в виде массива, нужно распарсить полученный с сервера данные
      // const posts = await res.json();
      // this.posts = posts;

      // C VUEX:
      // Вызов Экшена fetchPosts
      // this.$store.dispatch('fetchPosts');

      // Вызов созданного функцией mapActions() из Экшена fetchPosts() внутреннего метода fetchPosts():
      this.fetchPosts();
      // this.fetchPosts(4);
      // Значение, которое передаем функции в Экшене будет Вторым, т.к. первый параметр это Всегда некий контекст (ctx) (см. posts/modules/post.js)
    },
    // По аналогии с Геттерами, можно упростить работу с Экшенами
    // Функция mapActions помещается в секцию methods (а не computed, как mapGetters)
    // потому что Экшены - это методы, а Геттеры - это вычисляемые свойства.
    // В mapActions передаем массив строк с названиями Экшенов
    methods: mapActions(['fetchPosts']),
    // Метод mapActions() создает ВНУТРЕННИЙ метод аналогичный Экшену,
    // который нужно выхывать в секции mounted

    // Vuex служит для отделения логики работы с данными от их отображения (в компонентах).
    // Для работы с Vuex:
    // 1) Установить vuex npm i vuex --save
    // 2) Создать файл index.js в папке store
    // 3) В файле store/index.js подключить плагин

    // C VUEX:
    // Вместо объявления данных в приложении ( data: () => ({posts: []}) ),
    // в секции computed НАПРЯМУЮ обращаемся к Геттерам Стора:
    // computed: {
    //   // Вычисляемое свойство allPosts, по сути, будет следить за изменением Геттера allPosts Стора
    //   // Получение данных НАПРЯМУЮ из Стора:
    //   allPosts() {
    //     // Метод allPosts НЕ вызываем, а испоьзуем как геттер, т.е без ()
    //     // Геттер allPosts будет возвращать массив постов,
    //     // которые итерируются в копоненте (вместо v-for="post of posts")
    //
    //     return this.$store.getters.allPosts;
    //   }
    // }

    // Получение данных с помощью методов хелперов встроенных во Vuex
    // 1) Перед export default имопортируем эти методы
    // 2) Передаем в метод mapGetters массив строк с названиями Геттеров
    computed: mapGetters(['allPosts', 'countPost']),
    components: {
      Postform
    }
  }
</script>

<style>
  #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px auto;
    width: 640px;
  }

  .post {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px 20px;
  }
</style>
