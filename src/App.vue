<template>
  <NavigationBar></NavigationBar>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
</script>
