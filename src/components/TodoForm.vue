<template>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent>
    <div class="row">
      <div class="col-6">
        <div class="form-group mb-2">
          <label class="my-2">Todo Title</label>
          <input type="text" class="form-control" v-model="todo.title">
        </div>
        <button type="button" class="btn btn-outline-dark">Cancel</button>

        <slot
          name="submit-btn"
          type="submit"
          defaultClass="btn btn-primary ms-2"
          :value="todo.title"
        >
          <button type="submit" class="btn btn-primary ms-2">Save</button>
        </slot>

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
  <Toast v-if="showToast" :message="toastMessage" :type="toastType"></Toast>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import _ from 'lodash';

import { getTodoItem, putTodoItem } from '@/api';
// import { useToast } from '@/composables/toast';
import Toast from './toast/index.vue';

export default {
  setup() {
    const route = useRoute();
    const todoId = route.params.id;

    const todo = ref({});
    const originTodo = ref({});

    const loading = ref(true);
    //
    // const {
    //   showToast, toastType, toastMessage, triggerToast,
    // } = useToast();

    const getTodo = async () => {
      try {
        const res = await getTodoItem(todoId);
        todo.value = res.data;
        originTodo.value = { ...res.data };
        loading.value = false;
      } catch (err) {
        // triggerToast('Error occurred!', 'danger');
      }
    };

    const statusBtnClass = computed(() => (todo.value.done ? 'btn-success' : 'btn-danger'));
    const statusBtnLabel = computed(() => (todo.value.done ? 'Completed' : 'Incompleted'));

    const toggleTodoStatus = () => {
      todo.value.done = !todo.value.done;
    };

    const todoUpdated = computed(() => !_.isEqual(todo.value, originTodo.value));

    const onSave = async () => {
      try {
        const { data } = await putTodoItem(todoId, todo.value);
        originTodo.value = { ...data };
        // triggerToast('Successfully saved!');
      } catch (err) {
        // triggerToast('Error occurred!', 'danger');
      }
    };

    if (route.params.name === 'TodoCreate') getTodo();
    else loading.value = false;

    return {
      todo,
      loading,
      statusBtnClass,
      statusBtnLabel,
      toggleTodoStatus,
      todoUpdated,
      onSave,
      // showToast,
      // toastMessage,
      // toastType,
    };
  },
  components: {
    Toast,
  },
};
</script>

<style scoped>

</style>
