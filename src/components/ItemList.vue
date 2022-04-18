<template>
  <div v-for="(item, index) in items" :key="item.id ?? `item-${Date.now()}`" class="card mt-2">
    <slot :item="item" :index="index"></slot>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
