export default {
  namespaced: true,
  state: {
    toasts: [],
  },
  // [mutations]는 항상 동기적으로 동작해야 한다.
  mutations: {
    ADD_TOAST(state, aToast) {
      state.toasts.push(aToast);
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
  },
  actions: {
    triggerToast({ commit }, { message, type }) {
      commit('ADD_TOAST', { id: Date.now(), message, type });
      setTimeout(() => {
        commit('REMOVE_TOAST');
      }, 5000);
    },
  },
};
