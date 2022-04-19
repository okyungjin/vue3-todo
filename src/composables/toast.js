import { computed } from 'vue';
import { useStore } from 'vuex';

// eslint-disable-next-line import/prefer-default-export
export const useToast = () => {
  const { state, dispatch } = useStore();

  const showToast = computed(() => state.showToast);
  const toastType = computed(() => state.toastType);
  const toastMessage = computed(() => state.toastMessage);

  const triggerToast = (message, type = 'success') => dispatch('triggerToast', { message, type });

  return {
    showToast,
    toastType,
    toastMessage,
    triggerToast,
  };
};
