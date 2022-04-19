import { computed } from 'vue';
import { useStore } from 'vuex';

// eslint-disable-next-line import/prefer-default-export
export const useToast = () => {
  const { state, dispatch } = useStore();

  const showToast = computed(() => state.toast.showToast);
  const toastType = computed(() => state.toast.toastType);
  const toastMessage = computed(() => state.toast.toastMessage);

  const triggerToast = (message, type = 'success') => dispatch('toast/triggerToast', { message, type });

  // store.getters['toast/toastMessageWithSmile']

  return {
    showToast,
    toastType,
    toastMessage,
    triggerToast,
  };
};
