import { createStore } from 'vuex';

export default createStore({
  state: {
    showToast: false,
    toastType: 'success',
    toastMessage: '',
    toastTimer: null,
  },
});
