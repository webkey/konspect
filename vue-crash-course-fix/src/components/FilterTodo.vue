<template>
  <div>
    <div><strong>Filters:</strong></div>
    <select
        :value="value"
        @change="$emit('change', $event.target.value)"
    >
      <option
          v-for="filter of filters"
          :value="filter.value"
          :key="filter.id">
        {{filter.title}}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: String
    },
    data() {
      return {
        filters: [
          {id: 1, value: 'all', title: 'All Items'},
          {id: 2, value: 'completed', title: 'Completed Items'},
          {id: 3, value: 'no-completed', title: 'No Completed Items'}
        ]
      }
    }
  }
</script>

<style scoped>
  select {
    display: block;
    margin: 0 0 1rem;
  }
</style>