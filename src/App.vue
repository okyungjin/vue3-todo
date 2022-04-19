<template>
  <NavigationBar></NavigationBar>
  <div class="container">
    <router-view />
  </div>
  <Toast></Toast>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import Toast from '@/components/Toast.vue';

export default {
  components: {
    NavigationBar,
    Toast,
  },
};
</script>

<style scoped>

</style>
