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
            <HistoryTable :records="records" />
        </section>
    </div>
</template>

<script>
export default {
    name: 'history',
    // В поле data инициализируем нужные модели и флаг loading
    data: () => ({
        loading: true,
        records: [], // Поле Записей (по умолч. - это пустой массив)
        categories: [] // Полу Категорий (по умолч. - это пустой массив)
    }),
    // В хуке mounted забираем с сервера Категории и Записи
    // с помощью экшенов, которые уже использовали ранее (в Planning.vue)
    async mounted() {
        // Заносим полученные данные в ПРИВАТНЫЕ ПЕРЕМЕННЫЕ инстанса вью, либо их можно еще назвать МОДЕЛЯМИ:
        // this.records и this.categories.
        // Но сначала records нужно трансформировать для фронта.
        // this.records = await this.$store.dispatch('fetchRecords')
        // Для этого record заносим в локальную переменную, а в модель заносим уже результать трансформации, чтобы Вью не рендерил станицу два раза:
        // сначала после получения данных с сервера, а потом после их трансформации
        const records = await this.$store.dispatch('fetchRecords')
        this.categories = await this.$store.dispatch('fetchCategories')
        this.records = records.map(record => {
            // 15.1/ С помощью оператора map на каждой итерации мы получаем каждый элемент массива
            // (в records он является объектом с набором полей: amount, categoryId, date, description, id, type)
            return {
                // 15.2/ С помощью оператора spread (...) разворачиваем объект record: ...record
                // Оператор спред позволяет к существующим полям каждого элемента record добавля на каждой итерации новые поля 15.3
                ...record,
                // 15.3/ Добавляем название категории по ее id (categoryId)
                // Метод .find находить в массиве елемент-объек содержащий id равный categoryId, и возвращает найденный объект.
                // После чего у полученного объект берем значение поля title
                categoryName: this.categories.find(c => c.id === record.categoryId).title,
                // 15.4/ Добавляем класс и текст типа трансакции.
                // 15.4.1/ При определения класса цвета исп. тернарный оператор:
                typeClass: record.type === 'income' ? 'green' : 'red',
                // 15.4.2/ При определения текста типа операции также исп. тернарный оператор:
                typeText: record.type === 'income' ? 'Доход' : 'Расход'
            }
        })
        // После формирования нового объекта модели this.records, передаем ее в компонент HistoryTable 15.5
        // 15.6/ После получения всех данных с сервера, переопределяем модель прелоадера
        this.loading = false
    },
    components: {
        HistoryTable: () => import('../components/HistoryTable')
    }
};
</script>