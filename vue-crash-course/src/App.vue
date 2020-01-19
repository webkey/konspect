<template>
  <div id="app">
    <h1>To do application</h1>
    <AddTodo @add-todo="addTodo" />
    <hr>
    <!--3.-->
    <!--Вызываем копонент:-->
    <!--5.-->
    <!--В копонент передает данные todos-->
    <TodoList
        v-bind:todos="todos"
        v-on:remove-todo="removeTodo"
    />
  </div>
</template>

<script>
  // 1.
  // Импортируем компонент TodoList в родительский компонент
  import TodoList from '@/components/TodoList'
  // Импортируем компонент AddTodo в родительский компонент
  import AddTodo from '@/components/AddTodo'

  export default {
    name: 'app',
    data() {
      // 4.
      // Сформировать объект данных
      return {
        todos: [
          {id: 1, title: 'Купить хлеб', completed: false},
          {id: 2, title: 'Купить масло', completed: false},
          {id: 3, title: 'Купить пиво', completed: false}
        ]
      }
    },
    mounted() {
      fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then(json => this.todos = json)
    },
    methods: {
      removeTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id)
      },
      addTodo(newTodo) {
        console.log("newTodo: ", newTodo);
        this.todos.push(newTodo)
      }
    },
    components: {
      // 2.
      // Объект TodoList регистрируем указав ключ и значение
      // TodoList: TodoList
      // Ключ и значение совпадают, поэтому можно сокранить
      TodoList,
      AddTodo
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
    margin-top: 60px;
  }
</style>
