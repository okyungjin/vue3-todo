<template>
    <input class="form-control" type="text" v-model="search" placeholder="Type New Todo">
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const search = ref('');

    return {
      search,
    };
  },
};
</script>

<style scoped>

</style>
