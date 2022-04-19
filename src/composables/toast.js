import { onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';

// eslint-disable-next-line import/prefer-default-export
export const useToast = () => {
  const { state } = useStore();

  const showToast = computed(() => state.showToast);
  const toastType = computed(() => state.toastType);
  const toastMessage = computed(() => state.toastMessage);
  const toastTimer = computed(() => state.toastTimer);

  const triggerToast = (message, type = 'success') => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    toastTimer.value = setTimeout(() => {
      toastMessage.value = '';
      toastType.value = '';
      showToast.value = false;
    }, 3000);
  };

  onUnmounted(() => {
    clearTimeout(toastTimer.value);
  });

  return {
    showToast,
    toastType,
    toastMessage,
    triggerToast,
  };
};
