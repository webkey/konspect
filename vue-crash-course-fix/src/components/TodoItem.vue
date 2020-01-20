<template>
  <li>
    <span :class="{done: todo.completed}">
      <input
          type="checkbox"
          :checked="todo.completed"
          @change="todo.completed = !todo.completed"
      >
      <strong>{{index + 1}}</strong>
      {{todo.title}}
    </span>
    <button @click="$emit('remove-item', todo.id)">&times;</button>
  </li>
</template>

<script>
  export default {
    props: {
      todo: {
        type: Object,
        required: true
      },
      index: Number
    }
  }
</script>

<style scoped>
  li {
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    margin-right: 0.5rem;
  }

  button {
    border: 1px solid red;
    color: red;
    background: none;
    border-radius: 0.2rem;
  }
  
  .done {
    text-decoration: line-through;
    color: #bebebe;
  }
</style>