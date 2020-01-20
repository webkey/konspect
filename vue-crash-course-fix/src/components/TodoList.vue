<template>
  <div>
    <ul>
      <TodoItem
          v-for="(todo, i) of todos"
          :key="todo.id"
          :index="i"
          :todo="todo"
          @remove-item="removeItem"
      />
    </ul>
  </div>
</template>

<script>
  import TodoItem from '@/components/TodoItem'

  export default {
    components: {TodoItem},
    props: [
      'todos'
    ],
    methods: {
      removeItem(id) {
        this.$emit('remove-todo', id)
      }
    },
    comments: {
      TodoItem
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
