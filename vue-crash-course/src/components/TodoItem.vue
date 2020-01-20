<template>
  <li>
    <!--9.-->
    <!--Реализуем элемент списка-->
    <!--10.-->
    <!--Добавить динамический класс-->
    <span v-bind:class="{done: todo.completed}">
      <!--11.-->
      <!--Обработка события change для чекбокса-->
      <input
          type="checkbox"
          :checked="todo.completed"
          v-on:change="todo.completed = !todo.completed">
      <strong>{{index + 1}}</strong>
      {{todo.title | uppercase}}
    </span>
    <!--12.1.-->
    <!--Удаление элемента-->
    <!--Получение доступа к данным родительского элемента-->
    <button class="rm" v-on:click="$emit('remove-todo', todo.id)">&times;</button>
  </li>
</template>

<script>
  /*Експорт по дефолту объекта*/
  export default {
    props: {
      /*8.*/
      /*Способ передачи входящих данных с валидацией*/
      todo: {
        /*Входящие данные должны быть объектом*/
        type: Object,
        /*Если данные не предаются, то компонент не сможет работать*/
        required: true
      },
      index: Number
    },
    // Создать фильтр для выводимых данных
    filters: {
      uppercase(value) {
        return value.toUpperCase();
      }
    }
  }
</script>

<style scoped>
  li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem 2rem;
    margin: 0 0 2rem;
    border: 1px solid #ccc;
    text-align: left;
  }

  input[type=checkbox] {
    margin-right: 1rem;
  }

  .rm{
    background: red;
    color: #fff;
    border-radius: 0.2rem;
    border: none;
    font-weight: bold;
  }

  .done {
    text-decoration: line-through;
  }
</style>