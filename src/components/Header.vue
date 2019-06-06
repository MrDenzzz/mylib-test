<template>
  <div class="header">
    <div class="navbar__outer">
      <ul class="navbar">
        <router-link
          v-for="(link, index) in links"
          :key="index"
          tag="li"
          active-class="active"
          class="navbar__item"
          :to="`/${$route.params.id}${link.path}`"
        >
          {{ link.title }}
        </router-link>
      </ul>
    </div>
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'header-component',
  data() {
    return {
      links: [
        { path: '/books', name: 'books', title: 'Книги' },
        { path: '/want', name: 'want', title: 'Хочет прочитать' },
        { path: '/readed', name: 'readed', title: 'Прочитанные книги' },
      ],
    };
  },
  computed: {
    title() {
      return this.links.find(item => item.name === this.$route.name).title;
    },
  },
};
</script>


<style lang="scss">
  $background_color: #e4e2e2;

  .header {
    width: 100%;
    .navbar {
      max-width: 960px;
      display: flex;
      list-style: none;
      width: 100%;
      padding: 0;
      margin: 0 auto;
      border: solid 1px $background_color;
      border-bottom: unset;
      user-select: none;
      &__outer {
        width: 100%;
        display: flex;
        background: $background_color;
      }
      &__item {
        background: $background_color;
        color: #4e4e4e;
        padding: 15px 20px;
        cursor: pointer;
        &.active {
          background: #fff;
          color: #000;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      }
      @media (max-width: 480px) {
        flex-direction: column;
      }
    }
    .title {
      max-width: 960px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 20px;
    }
  }
</style>
