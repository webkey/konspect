<!--L09.12 Вынести Счет с Home.vue в отдельный копонент-->
<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>

      <!--// L09.36 Выводим в цекле наличные средства в разных валютах-->
      <p
          v-for="currency of currencies"
          :key="currency"
          class="currency-line">
        <span>
          <!--// L09.40 Применяем фильтр Валют-->
          {{getCurrency(currency) | currency(currency)}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    // L09.31 Указываем параметр rates как входящий из вне
    props: ['rates'],
    data: () => ({
      // L09.35 Завдим массив со списком валют, которые получаем с fixer.io
      currencies: ['RUB', 'USD', 'EUR']
    }),
    computed: {
      // L09.32 Делаем основной валютой рубли, а не евро, которое является остовной валютой по умолчанию
      base() {
        // L09.33
        // 1) Вытягиваем начальный счет (в рублях) пользователь с Firebase
        // 2) И делим его на частное от деления курса рубля на курс евро.
        // Но в чем суть пока не ясно. Курс евро - 1. Зачем делить на 1?
        return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR']);
      }
    },
    methods: {
      // L09.34 Получаем количество наличных средств по курсу в разных валютах
      getCurrency(currency) {
        // console.log(this.$store.getters.info.bill);
        return Math.floor(this.base * this.rates[currency] * 100) / 100;
      }
    }
  };
</script>