<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <div class="col s12 m6 l4">
        <HomeBill />
      </div>

      <div class="col s12 m6 l8">
        <HomeCurrency />
      </div>
    </div>
  </div>
</template>

<script>
  // L09.13 Импортируем компоненты
  import HomeBill from '../components/HomeBill'
  import HomeCurrency from '../components/HomeCurrency'

  export default {
    name: 'Home',
    components: {
      // L09.14 Подключаем компоненты
      HomeBill, HomeCurrency
    }
  }
</script>
