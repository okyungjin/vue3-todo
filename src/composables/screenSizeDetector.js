import { onBeforeUnmount, onMounted, ref } from 'vue';
import { isMobile, offResizeDetector, onResizeDetector } from '../helpers/resize';

// eslint-disable-next-line import/prefer-default-export
export const useScreenSizeDetector = () => {
  const showMobileView = ref(false);
  const mobileDetector = () => {
    showMobileView.value = isMobile();
  };

  mobileDetector();
  onMounted(() => { onResizeDetector(mobileDetector); });
  onBeforeUnmount(() => { offResizeDetector(mobileDetector); });

  return {
    showMobileView,
  };
};
