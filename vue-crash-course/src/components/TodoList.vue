<template>
  <div>
    <ul>
      <!--7.-->
      <!--{{todos}} Здесь мы получаем объект todos с App.vue приведенный к строке-->
      <!--Делаем итерирование todos-->
      <TodoItem
        v-for="(todo, i) of todos"
        v-bind:todo="todo"
        v-bind:index="i"
        v-on:remove-todo="removeTodo"
      />
    </ul>
  </div>
</template>

<script>
  import TodoItem from "@/components/TodoItem"
  export default {
    name: 'app',
    // 6.
    // В props передаем из родительского компонента объект todos
    // указывая, что todos является входящим свойством
    props: [
        'todos' // todos становится доступным в этом копоненте
    ],
    components: {
      TodoItem
    },
    methods: {
      removeTodo(id) {
        this.$emit('remove-todo', id);
      }
    }
  }
</script>

<!--Атрибут scoped ограничивает видимость стилей текущим компонентом-->
<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>