<!--// L09.15 Создаеме комонент лоадер. В папке app,
так как он не относится к определенной странице-->
<template>
  <div class="app-loader">
    <!--// L09.16 Прелоадер взят с материалайза https://materializecss.com/preloader.html-->
    <div class="preloader-wrapper active">
      <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loader",
    computed: {
      // L09.17 Изменять цвет прелоадера рандомно
      color() {
        const colors = ['spinner-red-only', 'spinner-green-only', 'spinner-blue-only'];
        return colors[Math.floor(Math.random() * 3)]
      }
    }
  }
</script>

<style scoped>

</style>