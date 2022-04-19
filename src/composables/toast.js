import { computed } from 'vue';
import { useStore } from 'vuex';

// eslint-disable-next-line import/prefer-default-export
export const useToast = () => {
  const { state, dispatch } = useStore();

  const toasts = computed(() => state.toast.toasts);

  const triggerToast = (message, type = 'success') => dispatch('toast/triggerToast', { message, type });

  // store.getters['toast/toastMessageWithSmile']

  return {
    toasts,
    triggerToast,
  };
};
