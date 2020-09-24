<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">Записей пока нет <router-link to="/record">Добавьте первую</router-link></p>

        <section v-else>
            <!--15.5-->
            <!--<HistoryTable :records="records" />--><!--17.10.1-->
            <HistoryTable :records="items" /><!--17.10.2 Вместо массива всех элементов, передаем подмасив активных пунктов из миксина pagination.mixin.js-->
            <!--17.3-->
            <!--Вызов компонента - main.js-->
            <!--17.11-->
            <!--В параметры пагинации передаем данные из миксина pagination.mixin.js-->
            <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
            />
        </section>
    </div>
</template>

<script>
// 17.6
import paginationMixin from '../mixins/pagination.mixin'

export default {
    name: 'history',
    // В поле data инициализируем нужные модели и флаг loading
    mixins: [paginationMixin], // 17.7 Добавление миксина в компонент. Вью будет мержить данные миксина с данными компонента
    data: () => ({
        loading: true,
        records: [], // Поле Записей (по умолч. - это пустой массив)
        // categories: [], // Поле Категорий (по умолч. - это пустой массив) // 17.8.1 categories делаем переменной, а не полем data
    }),
    // В хуке mounted забираем с сервера Категории и Записи
    // с помощью экшенов, которые уже использовали ранее (в Planning.vue)
    async mounted() {
        // Заносим полученные данные в ПРИВАТНЫЕ ПЕРЕМЕННЫЕ инстанса вью, либо их можно еще назвать МОДЕЛЯМИ:
        // this.records и this.categories.
        // Но сначала records нужно трансформировать для фронта.
        this.records = await this.$store.dispatch('fetchRecords') // 17.9.1 В this.records сохраняем входящий массив
        // Для этого record заносим в локальную переменную, а в модель заносим уже результать трансформации, чтобы Вью не рендерил станицу два раза:
        // сначала после получения данных с сервера, а потом после их трансформации
        // const records = await this.$store.dispatch('fetchRecords') // 17.9.2 Входящий массив сохраняем в модель, а не в переменную
        const categories = await this.$store.dispatch('fetchCategories') // 17.8.2 categories делаем переменной, а не полем data
        // this.records = records.map(record => { // 17.9.3 // Трансформацию массива делаем непосредственно во входящем параметре метода pageChangeHandler
        this.setupPagination(this.records.map(record => { // 17.9.4 // Трансформацию массива делаем непосредственно во входящем параметре метода pageChangeHandler
            // 15.1/ С помощью оператора map на каждой итерации мы получаем каждый элемент массива
            // (в records он является объектом с набором полей: amount, categoryId, date, description, id, type)
            return {
                // 15.2/ С помощью оператора spread (...) разворачиваем объект record: ...record
                // Оператор спред позволяет к существующим полям каждого элемента record добавля на каждой итерации новые поля 15.3
                ...record,
                // 15.3/ Добавляем название категории по ее id (categoryId)
                // Метод .find находить в массиве елемент-объек содержащий id равный categoryId, и возвращает найденный объект.
                // После чего у полученного объект берем значение поля title
                categoryName: categories.find(c => c.id === record.categoryId).title,
                // 15.4/ Добавляем класс и текст типа трансакции.
                // 15.4.1/ При определения класса цвета исп. тернарный оператор:
                typeClass: record.type === 'income' ? 'green' : 'red',
                // 15.4.2/ При определения текста типа операции также исп. тернарный оператор:
                typeText: record.type === 'income' ? 'Доход' : 'Расход'
            }
        }))
        // После формирования нового объекта модели this.records, передаем ее в компонент HistoryTable 15.5
        // 15.6/ После получения всех данных с сервера, переопределяем модель прелоадера
        this.loading = false
    },
    components: {
        HistoryTable: () => import('../components/HistoryTable'),
    },
};
</script>