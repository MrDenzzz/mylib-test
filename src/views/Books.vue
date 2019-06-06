<template>
  <div class="view">
    <Header />
    <FilterNav />
    <BooksList :books="books" />
    <infinite-loading @infinite="loadMore"></infinite-loading>
  </div>
</template>

<script>
import BooksList from '@/components/BooksList';
import Header from '@/components/Header';
import FilterNav from '@/components/Filter';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'books-view',
  components: {
    BooksList,
    Header,
    FilterNav,
  },
  computed: {
    ...mapGetters([
      'books',
      'shelf',
    ]),
  },
  watch: {
    '$route.name': function (val) { // eslint-disable-line func-names
      if (val === 'readed') {
        this.getReaded({ id: this.$route.params.id, reset: true });
      } else if (!this.shelf) {
        this.getShelf(this.$route.params.id)
          .then(() => {
            this.getBooks({ shelf: val, reset: true });
          });
      } else {
        this.getBooks({ shelf: val, reset: true });
      }
    },
  },
  methods: {
    ...mapActions([
      'getBooks',
      'getShelf',
      'getReaded',
    ]),
    loadMore($state) {
      if (this.$route.name === 'readed') {
        this.getReaded({ id: this.$route.params.id })
          .then(() => {
            $state.loaded();
          });
      } else if (!this.shelf) {
        this.getShelf(this.$route.params.id)
          .then(() => {
            this.getBooks({ shelf: this.$route.name })
              .then(() => {
                $state.loaded();
              });
          });
      } else {
        this.getBooks({ shelf: this.$route.name })
          .then(() => {
            $state.loaded();
          });
      }
    },
    created() {
      this.getShelf(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">
.view {
  width: 100%;
}
</style>
