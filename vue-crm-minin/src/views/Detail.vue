<template>
    <div>
        <Loader v-if="loading" />
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">История</router-link>
                <a @click.prevent class="breadcrumb">
                    {{ record.type === 'income' ? 'Доход' : 'Расход' }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div
                        :class="{
                            'red': record.type === 'outcome',
                            'green': record.type === 'income'
                        }"
                        class="card"
                    >
                        <div class="card-content white-text">
                            <p>Описание: {{record.description}}</p>
                            <p>Сумма: {{record.amount | currency}}</p>
                            <p>Категория: {{record.categoryName}}</p>

                            <small>{{record.date | date('datetime')}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p v-else>Запись с <i>id={{$route.params.id}}</i> не найдена</p>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    data: () => ({
        record: null,
        loading: true
    }),

    async mounted() {
        // 16.5/ Получаем с сервера объект Записи по ее id
        // 16.5.1/ С помощью оператор await "ждем" пока Стор задиспатчит и выполнит метод (экшен),
        // который называется "fetchRecordById",
        // куда нужно передать id Записи.
        // id находится в адресной строке.
        // Чтобы получить id из адресной строки, нужно обратиться к системной переменной this.$route (не $router, а текущий $route),
        // обратиться к полю .params и дальше к полю .id
        // Названее поля .id берется из router/index.js из поля // route-5:
        // path: '/detail/:id',
        // Если бы мы в path происали, например, /detail/:recordId,
        // то id получали бы из поля this.$route.params.recordId
        const id = this.$route.params.id
        const record = await this.$store.dispatch('fetchRecordById', id)
        // В результате успешного выполнения экшена мы получим объект Записи со следуюющими полями:
        // amount, categoryId, date, description, id, type
        // 16.5.2/ По тойже схеме получаем объект категории, но id берем не из роута,
        // а из поля categoryId полученной Записи
        const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

        this.record = {
            ...record,
            categoryName: category.title,
        }

        this.loading = false;
    }
}
</script>