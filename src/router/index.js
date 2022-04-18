import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Index.vue';
import mHome from '../pages/mobile/Index.vue';
import Todos from '../pages/todos/Index.vue';
import Todo from '../pages/todos/_id.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        mobile: mHome,
      },
    },
    {
      path: '/todos',
      name: 'Todos',
      components: {
        default: Todos,
        mobile: Todos,
      },
    },
    {
      path: '/todos/:id',
      name: 'Todo',
      component: Todo,
    },
  ],
});

export default router;
