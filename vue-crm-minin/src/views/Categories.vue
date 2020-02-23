<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <div class="col s12 m6">
          <CategoryCreate @created="addNewCategory" />
        </div>
        <div class="col s12 m6">
          <!--Здесь :key используется для того, чтобы Вью перерисовывал полностью компонент при изменении ключа :key-->
          <!--Модель idx создал не по уроку. С целью сообщать селекту, какаую категорию изменяем и оставлять ее выбранной в селекте при перерисовки-->
          <CategoryEdit
              v-if="categories.length"
              :categories="categories"
              :idx="idx"
              :key="categories.length + updateCount"
              @updated="updateCategories"
          />
          <p v-else class="center">Категорий пока нет</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '@/components/CategoryCreate'
  import CategoryEdit from '@/components/CategoryEdit'

  export default {
    name: 'Categories',
    data: () => ({
      categories: [],
      idx: 0,
      loading: true,
      updateCount: 0
    }),
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false
    },
    methods: {
      addNewCategory(category) {
        this.categories.push(category)
      },
      updateCategories(category) {
        this.idx = this.categories.findIndex(c => c.id === category.id)
        this.categories[this.idx].title = category.title;
        this.categories[this.idx].limit = category.limit;
        this.updateCount++
      }
    },
    components: {
      CategoryCreate, CategoryEdit
    }
  }
</script>