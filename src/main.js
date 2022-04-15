import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ToastComponent from './components/toast/index.vue';
import { createComponent } from './components/toast/helpers';

const useToast = (globalProps = {}) => ({
  open(options) {
    let message = null;
    if (typeof options === 'string') message = options;

    const defaultProps = {
      message,
    };

    const propsData = { ...defaultProps, ...globalProps, ...options };

    const instance = createComponent(ToastComponent, propsData, document.body);

    return {
      dismiss: instance.ctx.dismiss,
    };
  },
});

const ToastPlugin = {
  install: (app, options = {}) => {
    const instance = useToast(options);
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$toast = instance;
    app.provide('$toast', instance);
  },
};

const app = createApp(App);

app
  .use(router)
  .use(ToastPlugin)
  .mount('#app');
