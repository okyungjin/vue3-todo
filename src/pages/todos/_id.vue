<template>
  <h2>To-Do Page</h2>
  <div v-if="loading">Loading...</div>
  <form v-else>
    <div class="row">
      <div class="col-6">
        <div class="form-group mb-2">
          <label class="my-2">Todo Subject</label>
          <input type="text" class="form-control" v-model="todo.title">
        </div>
        <button type="button" class="btn btn-outline-dark">Cancel</button>
        <button type="submit" class="btn btn-primary ms-2">Save</button>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label class="my-2">Status</label>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          :class="statusBtnClass"
          @click="toggleTodoStatus"
        >{{ statusBtnLabel }}</button>
      </div>
    </div>
  </form>
</template>

<script>
import { useRoute } from 'vue-router';
import { getTodoItem } from '@/api';
import { ref, computed } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const todoId = route.params.id;
    const todo = ref(null);
    const loading = ref(true);

    const getTodo = async () => {
      const res = await getTodoItem(todoId);
      todo.value = res.data;
      loading.value = false;
    };

    const statusBtnClass = computed(() => (todo.value.done ? 'btn-success' : 'btn-danger'));
    const statusBtnLabel = computed(() => (todo.value.done ? 'Completed' : 'Incompleted'));

    const toggleTodoStatus = () => {
      todo.value.done = !todo.value.done;
    };

    getTodo();

    return {
      todo,
      loading,
      statusBtnClass,
      statusBtnLabel,
      toggleTodoStatus,
    };
  },
};
</script>

<style scoped>

</style>
