import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
// eslint-disable-next-line
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(InfiniteLoading);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
