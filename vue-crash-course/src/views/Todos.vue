<template>
  <div>
    <h2>Todo application</h2>
    <router-link to="/">Home</router-link>
    <hr>
    <AddTodo @add-todo="addTodo" />
    <select v-model="filter">
      <option value="all">All Items</option>
      <option value="completed">Completed</option>
      <option value="not-completed">Not Completed</option>
    </select>
    <hr>
    <!--Добавляем копмонент прелоадера списка-->
    <Loader v-if="loaded" />
    <!--3.-->
    <!--Вызываем копонент:-->
    <!--5.-->
    <!--В копонент передает данные todos-->
    <TodoList
        v-else-if="filteredTodos.length"
        v-bind:todos="filteredTodos"
        v-on:remove-todo="removeTodo"
    />
    <p v-else>No todos! </p>
  </div>
</template>

<script>
  // 1.
  // Импортируем компонент TodoList в родительский компонент
  import TodoList from '@/components/TodoList'
  // Импортируем компонент AddTodo в родительский компонент
  import AddTodo from '@/components/AddTodo'
  // Импортируем компонент с прелоадером списка
  import Loader from '@/components/Loader'

  export default {
    name: 'app',
    data() {
      // 4.
      // Сформировать объект данных
      return {
        todos: [],
        loaded: true,
        filter: 'all'
      }
    },
    mounted() {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
          .then(response => response.json())
          .then(json => {
            setTimeout(() => {
              this.todos = json
              this.loaded = false
            }, 1000)
          })
    },
    // watch: {
    //   filtered(value) {
    //     console.log('value: ', value);
    //   }
    // },
    computed: {
      filteredTodos() {
        if (this.filter === 'all') {
          return this.todos
        }

        if (this.filter === 'completed') {
          return this.todos.filter(t => t.completed)
        }

        if (this.filter === 'not-completed') {
          return this.todos.filter(t => !t.completed)
        }
      }
    },
    methods: {
      removeTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id)
      },
      addTodo(newTodo) {
        this.todos.push(newTodo)
      }
    },
    components: {
      // 2.
      // Объект TodoList регистрируем указав ключ и значение
      // TodoList: TodoList
      // Ключ и значение совпадают, поэтому можно сокранить
      TodoList,
      AddTodo,
      Loader
    }
  };
</script>