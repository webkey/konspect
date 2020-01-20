<template>
  <div>
    <router-link to="/">Home</router-link>
    <h2>Todo list</h2>
    <AddTodo
        @create-todo="createTodo"
    />
    <TodoList
        :todos="todos"
        @remove-todo="removeTodo"
    />
  </div>
</template>

<script>
  import TodoList from '@/components/TodoList'
  import AddTodo from '@/components/AddTodo'

  export default {
    name: 'app',
    data() {
      return {
        todos: []
      }
    },
    mounted() {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
          .then(response => response.json())
          .then(json => {
            this.todos = json
          })
    },
    methods: {
      removeTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id)
      },
      createTodo(newTodo) {
        this.todos.push(newTodo)
      }
    },
    components: {
      TodoList,
      AddTodo
    }
  }
</script>