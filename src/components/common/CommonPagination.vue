<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" @click="moveToPrevPage" v-if="currentPage > 1">
        <a class="page-link pointer">Previous</a>
      </li>
      <li v-for="page in numOfPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
          @click="onPageChange(page)">
        <a class="page-link pointer">{{ page }}</a>
      </li>
      <li class="page-item" @click="moveToNextPage" v-if="currentPage < numOfPages">
        <a class="page-link pointer">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalItemCount: {
      type: Number,
      required: true,
    },
    rowsPerPage: {
      type: Number,
      default: 10,
    },
  },
  emits: ['update:currentPage'],
  setup(props, { emit }) {
    const numOfPages = computed(() => Math.ceil(props.totalItemCount / props.rowsPerPage));

    const isPageValid = (page, total) => page > 0 && page <= total;

    const onPageChange = (page) => {
      if (isPageValid(page, props.totalItemCount)) emit('update:currentPage', page);
    };

    const moveToPrevPage = () => {
      onPageChange(props.currentPage - 1);
    };

    const moveToNextPage = () => {
      onPageChange(props.currentPage + 1);
    };

    return {
      numOfPages,
      moveToPrevPage,
      moveToNextPage,
      onPageChange,
    };
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
