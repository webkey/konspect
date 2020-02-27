<template>
  <div>
    <!--// L09.49 Показываем лоадер, если модель loading находится в значении true-->
    <Loader v-if="loading" />
    <!--// L09.50 Если модель loading находится в значении false, то показываем контет-->
    <div
        v-else
        class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link v-tooltip="'Добавить новую категорию'" class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from "../components/app/Navbar";
  import Sidebar from "../components/app/Sidebar";
  import message from "../utils/message";

  export default {
    data: () => ({
      isOpen: true,
      // L09.48 Добавляем модель отображения прелоадера
      loading: true
    }),
    async mounted() {
      // Метод mounted лучше всего подходит для работы с АСИНХРОННЫМИ запросами
      // L09.1. Если в геттерах не будет данных о пользователях, то вызываем метод для аснх. получения этих данных
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }

      // L09.49 Удаляем прелоадер, если данные уже есть
      this.loading = false;
    },
    components: {Sidebar, Navbar},
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