<template>
  <NavigationBar></NavigationBar>
  <div class="container">
    <router-view />
  </div>
  <Toast
    v-if="showToast"
    :message="toastMessage"
    :type="toastType"
  ></Toast>
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
