<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <!--// L09.46 Реализуем кнопку обновления курса валют-->
      <button
          @click.prevent="refresh"
          class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <!--// L09.22 Добавляем компонент Лоадера. Он здесь доступен, так как зарегистрирован глобально в main.js-->
    <Loader v-if="loading" />

    <div v-else class="row">
      <div class="col s12 m6 l4">
        <!--// L09.30 передаем currency.rates (курсы валют) внуть комонента-->
        <HomeBill
            :rates="currency.rates"
        />
      </div>

      <div class="col s12 m6 l8">
        <!--// L09.41 передаем currency.rates (курсы валют) внуть комонента-->
        <!--// L09.42 передаем currency.date (дата текущего курса) внуть комонента-->
        <HomeCurrency
            :rates="currency.rates"
            :date="currency.date"
        />
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
    data: () => ({
      // L09.20 Определяем модель для отображения Лоадера
      loading: true,
      // L09.21 Определяем модель в которой будут храниться данные по валюте
      currency: null
    }),
    async mounted() {
      // L09.23 Добавляем асинхронных метод, который будет обращаться к Стору (vuex)
      // и сохранять данные в моделе currency
      // 'fetchCurrency' - это Action, потому .dispatch()
      this.currency = await this.$store.dispatch('fetchCurrency');
      // L09.24 После этого установить модель loading в значение false, чтобы скрыть Лоадер и показать контент
      this.loading = false;
    },
    methods: {
      // L09.47 Реализуем метод обновления курса валют
      async refresh() {
        this.loading = true;
        this.currency = await this.$store.dispatch('fetchCurrency');
        this.loading = false;
      }
    },
    components: {
      // L09.14 Подключаем компоненты
      HomeBill, HomeCurrency
    }
  }
</script>
