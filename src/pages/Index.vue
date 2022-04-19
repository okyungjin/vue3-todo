<template>
  <h2>Home</h2>
  <div>{{ count }}</div>
  <button class="btn btn-primary" @click="count++">Increment</button>
</template>

<script>
import { useCount } from '../composables/count';

export default {
  setup() {
    const { count } = useCount();
    console.log(count);

    return {
      count,
    };
  },
};
</script>
