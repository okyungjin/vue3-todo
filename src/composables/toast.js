import { onUnmounted, ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useToast = () => {
  const showToast = ref(false);
  const toastType = ref('success');
  const toastMessage = ref('');

  let toastTimer;
  const triggerToast = (message, type = 'success') => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    toastTimer = setTimeout(() => {
      console.log('timeout');
      toastMessage.value = '';
      toastType.value = '';
      showToast.value = false;
    }, 3000);
  };

  onUnmounted(() => {
    console.log('onUnmounted');
    clearTimeout(toastTimer);
  });

  return {
    showToast,
    toastType,
    toastMessage,
    triggerToast,
  };
};
