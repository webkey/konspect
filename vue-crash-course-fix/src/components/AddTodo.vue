<template>
  <div>
    <div><strong>Create new todo:</strong></div>
    <form @submit.prevent="createTodo">
      <input type="text" v-model="title">
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: ''
      }
    },
    methods: {
      createTodo() {
        /* eslint-disable no-alert, no-console */
        console.log('submit: ', this.title);
        
        if(this.title.trim()) {
          const newTodo = {
            id: Date.now(),
            title: this.title,
            completed: false
          };

          this.$emit('create-todo', newTodo)

          this.title = ''
        }
      }
    }
  }
</script>

<style scoped>
  form {
    display: flex;
    margin: 0 0 1rem;
    padding: 0 0 1rem;
    border-bottom: 1px solid currentColor;
  }

  input {
    margin-right: 0.5rem;
  }

  button {
    border: 1px solid darkolivegreen;
    color: darkolivegreen;
    background: none;
    border-radius: 0.2rem;
  }
</style>