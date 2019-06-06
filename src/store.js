import Vue from 'vue';
import Vuex from 'vuex';
import $http from './helpers/http-common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    shelf: null,
    page: 1,
    order: {
      readed: {
        type: 'id',
        direction: 'desc',
      },
      other: {
        type: 'created',
        direction: 'desc',
      },
    },
  },
  getters: {
    books: state => state.books,
    shelf: state => state.shelf,
    order: state => state.order,
  },
  mutations: {
    setBooks(state, data) {
      state.books.push(...data);
      state.page += 1; // eslint-disable-line no-param-reassign
    },
    setShelf(state, data) {
      state.shelf = { // eslint-disable-line no-param-reassign
        books: data[0].id,
        want: data[1].id,
      };
    },
    resetStore(state) {
      state.books = []; // eslint-disable-line no-param-reassign
      state.page = 1; // eslint-disable-line no-param-reassign
    },
    setFilter(state, { type, filter }) {
      state.order[type] = filter; // eslint-disable-line no-param-reassign
    },
  },
  actions: {
    getBooks({ commit, state }, { shelf, reset, filter }) {
      if (reset) commit('resetStore');
      if (filter) commit('setFilter', { type: 'other', filter });

      const orderSymbol = `${state.order.other.direction === 'asc' ? '' : '-'}`;
      const order = `${orderSymbol}${state.order.other.type}`;

      return $http.get(`userbooks/?bookshelf=${state.shelf[shelf]}&page=${state.page}&o=${order}`)
        .then((res) => {
          commit('setBooks', res.data.objects);
        })
        .catch((error) => {
          console.log(error); // eslint-disable-line no-console
        });
    },
    getShelf({ commit }, id) {
      return $http.get(`userbooks/bookshelf/?user=${id}`)
        .then((res) => {
          commit('setShelf', res.data);
        })
        .catch((error) => {
          console.log(error); // eslint-disable-line no-console
        });
    },
    getReaded({ commit, state }, { id, reset, filter }) {
      if (reset) commit('resetStore');
      if (filter) commit('setFilter', { type: 'readed', filter });

      const orderSymbol = `${state.order.readed.direction === 'asc' ? '' : '-'}`;
      const order = `${orderSymbol}${state.order.readed.type}`;

      return $http.get(`rating/?user=${id}&page=${state.page}&o=${order}`)
        .then((res) => {
          commit('setBooks', res.data.objects);
        })
        .catch((error) => {
          console.log(error); // eslint-disable-line no-console
        });
    },
  },
});
