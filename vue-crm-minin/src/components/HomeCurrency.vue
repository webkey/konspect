<!--L09.13 Вынести Курс валют с Home.vue в отдельный копонент-->
<template>
  <div class="card orange darken-3 bill-card">
    <div class="card-content white-text">
      <div class="card-header">
        <span class="card-title">Курс валют</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
        </thead>

        <tbody>
          <!--// L09.45 Выводим значения Валюты, курса и числа-->
          <tr
              v-for="cur of currencies"
              :key="cur">
            <td>{{cur}}</td>
            <td>{{(rates[cur]).toFixed(4)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    // L09.43 Регистируем входящие данные
    props: ['rates', 'date'],
    // L09.44 Содаем массив валют
    data: () => ({
      currencies: ['RUB', 'USD', 'EUR']
    })
  }
</script>