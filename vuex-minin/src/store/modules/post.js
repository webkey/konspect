export default {
  actions: {
    // В поле actions производим получение и обработку данных с сервера
    async fetchPosts(ctx, limit = 3) {
      // Экшен вызвается через метод Стора .dispatch() в App.vue
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=' + limit); // Ссылка сгенерирована сервисом jsonplaceholder.typicode.com
      const posts = await res.json();

      // 1) Первым параметром в Экшины всегда передается Контекст (ctx),
      // у которого есть свои методы
      // 2) Значения, передаваемые на вход функции Экшена
      // С помощью метода ctx.commit вызываются Мутации
      ctx.commit('updatePosts', posts);
      // где
      // 1) Первый параметр - Строка - Название Мутации
      // 2) Второй параметр - Значения, которые попадут во второй параметр Мутации
    }
  },
  mutations: {
    // Для изменения Стейтов используем Мутации
    // 1) Первый парам. всегда state
    // 2) Второй парам. это то, что будет передаваться в state
    updatePosts: (state, posts) => {
      // Мутации ВСЕГДА синхронны (т.е. без await)
      state.posts = posts
      // Мутации вызыватюся с помощью метода .commit в Экшинах
    },
    createPost: (state, newPost) => state.posts.unshift(newPost)
  },
  state: {
    posts: []
    // Работа с данными posts:
    // 1) обращение непосредственно к state.posts
    // 2) создание Геттеров (предпочтительнее)
  },
  getters: {
    // Чтобы в Представление не добавлялись пустые посты
    // (они будут добавлятся только в Стейт - это просто для примера работы Геттеров),
    // создадим валидатор
    validPosts(state) {
      return state.posts.filter(p => p.title && p.body)
    },
    // После этого во Vue.app нужно заменить allPosts на validPosts

    // Забирает значения из state и возвращает данные
    // К Геттеру allPosts можно обратится в App.vue
    allPosts: (state) => state.posts,

    // Геттер для получения количества постов
    countPost: (state) => state.posts.length
  }
}