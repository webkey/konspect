<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
  import message from "../utils/message";
  export default {
    computed: {
      error() {
        // Вычесляемое свойство error будет возваращать значение поля error в геттерах
        // и меняться, в случае изменения error в геттерах
        return this.$store.getters.error;
      }
    },
    watch: {
      // 1) Сделить за вычисляемым свойством error
      // 2) Получать ошибку в формате firebase
      error(fbError) {
        this.$error(message[fbError.code] || message['unknown'])
      }
    }
  }
</script>