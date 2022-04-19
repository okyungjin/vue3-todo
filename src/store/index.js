import { createStore } from 'vuex';

export default createStore({
  modules: {
    toast: {
      namespaced: true,
      state: {
        showToast: false,
        toastMessage: '',
        toastType: 'success',
      },
      // [mutations]는 항상 동기적으로 동작해야 한다.
      mutations: {
        UPDATE_TOAST_STATUS(state, payload) {
          state.showToast = payload;
        },
        UPDATE_TOAST_MESSAGE(state, payload) {
          state.toastMessage = payload;
        },
        UPDATE_TOAST_TYPE(state, payload) {
          state.toastType = payload;
        },
      },
      actions: {
        triggerToast({ commit }, { message, type }) {
          commit('UPDATE_TOAST_MESSAGE', message);
          commit('UPDATE_TOAST_TYPE', type);
          commit('UPDATE_TOAST_STATUS', true);
        },
      },
    },
  },
});
