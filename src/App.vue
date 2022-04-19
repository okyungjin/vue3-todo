<template>
  <NavigationBar></NavigationBar>
  <div class="container">
    <router-view />
  </div>
  <transition name="slide">
    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
    ></Toast>
  </transition>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import Toast from '@/components/Toast.vue';
import { useToast } from './composables/toast';

export default {
  setup() {
    const { showToast, toastType, toastMessage } = useToast();

    return {
      showToast,
      toastType,
      toastMessage,
    };
  },
  components: {
    NavigationBar,
    Toast,
  },
};
</script>

<style scoped>

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  .slide-enter-to,
  .slide-leave-from {
    opacity: 1;
    transform: translateY(0px);
  }
</style>
