<template>
  <ul class="filter">
    <li
      :class="[{ active: isActive(item) }, 'filter__item']"
      v-for="(item, index) in filteredItems"
      :key="index"
      @click="sort(item)">
      {{ item.title }}
      {{ isActive(item) ? filteredOrder.direction === 'asc' ? '↑' : '↓' : '↑' }}
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'filter-component',
  data() {
    return {
      items: [
        { value: 'id', type: 'readed', title: 'По дате добавления' },
        { value: 'score', type: 'readed', title: 'По оценке' },
        { value: 'created', type: 'other', title: 'По дате добавления' },
        { value: 'work__default_edition__title', type: 'other', title: 'По названию' },
        { value: 'work__rating_score', type: 'other', title: 'По общему рейтингу' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'order',
    ]),
    filteredItems() {
      return this.items.filter(item => item.type === this.type);
    },
    type() {
      return this.$route.name === 'readed' ? 'readed' : 'other';
    },
    filteredOrder() {
      return this.order[this.type];
    },
  },
  methods: {
    ...mapActions([
      'getBooks',
      'getReaded',
    ]),
    sort(item) {
      let direction;

      if (this.isActive(item) && this.filteredOrder.direction === 'desc') {
        direction = 'asc';
      } else {
        direction = 'desc';
      }

      if (this.type === 'readed') {
        this.getReaded({
          id: this.$route.params.id,
          reset: true,
          filter: { type: item.value, direction },
        });
      } else {
        this.getBooks({
          shelf: this.$route.name,
          reset: true,
          filter: { type: item.value, direction },
        });
      }
    },
    isActive(item) {
      return item.value === this.filteredOrder.type;
    },
  },
};
</script>


<style lang="scss">
  .filter {
    max-width: 960px;
    display: flex;
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0 auto 20px auto;
    &__item {
      padding: 8px 12px;
      cursor: pointer;
      &.active {
        color: #010ca7;
      }
    }
  }
</style>
