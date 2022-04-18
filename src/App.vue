<template>
  <NavigationBar></NavigationBar>
  <div class="container">
    <router-view v-if="!showMobileView"></router-view>
    <router-view v-else name="mobile"></router-view>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import { useScreenSizeDetector } from './composables/screenSizeDetector';

export default {
  setup() {
    const { showMobileView } = useScreenSizeDetector();

    return {
      showMobileView,
    };
  },
  components: {
    NavigationBar,
  },
};
</script>
