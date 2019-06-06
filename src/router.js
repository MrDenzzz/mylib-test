import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line
import Books from './views/Books.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/1/books',
    },
    {
      path: '/:id',
      name: 'user',
      redirect: '/:id/books',
    },
    {
      path: '/:id/books',
      name: 'books',
      component: Books,
    },
    {
      path: '/:id/want',
      name: 'want',
      component: Books,
    },
    {
      path: '/:id/readed',
      name: 'readed',
      component: Books,
    },
  ],
});
