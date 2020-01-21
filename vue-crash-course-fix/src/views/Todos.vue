<template>
  <div>
    <h2>Todo list</h2>
    <router-link to="/">Home</router-link>
    <hr>
    <AddTodo
        @create-todo="createTodo"
    />
    <FilterTodo
      v-model="filter"
    />
    <TodoList
        v-if="filteredTodos.length"
        :todos="filteredTodos"
        @remove-todo="removeTodo"
    />
    <p v-else>No todos!</p>
  </div>
</template>

<script>
  import TodoList from '@/components/TodoList'
  import AddTodo from '@/components/AddTodo'
  import FilterTodo from '@/components/FilterTodo'

  export default {
    name: 'app',
    data() {
      return {
        todos: [],
        filter: 'all'
      }
    },
    mounted() {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
          .then(response => response.json())
          .then(json => {
            this.todos = json
          })
    },
    // watch: {
    //   filter(value) {
    //     /* eslint-disable no-alert, no-console */
    //     console.log('value: ', value);
    //   }
    // },
    computed: {
      filteredTodos() {
        if(this.filter === 'completed') {
          return this.todos.filter(t => t.completed)
        }

        if(this.filter === 'no-completed') {
          return this.todos.filter(t => !t.completed)
        }

        return this.todos;
      }
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
      AddTodo,
      FilterTodo
    }
  }
</script>