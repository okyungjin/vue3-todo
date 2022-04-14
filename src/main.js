import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from './components/Toast.vue';

const app = createApp(App);

app
  .use(router)
  .component('Toast', Toast)
  .mount('#app');
