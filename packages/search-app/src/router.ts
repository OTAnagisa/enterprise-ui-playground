import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from './pages/SearchPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchPage,
    },
  ],
});
