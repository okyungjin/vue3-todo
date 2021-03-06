<template>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent>
    <div class="row">
      <div class="col-6">
        <div class="form-group mb-2">
          <CommonInput
            label="Title"
            required
            v-model="todo.title"
          ></CommonInput>
        </div>
      </div>

      <div v-if="editing" class="col-6">
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

      <div class="col-12">
        <div class="form-group">
          <label class="my-2">Body</label>
          <textarea
            class="form-control"
            v-model="todo.body"
            name=""
            id=""
            cols="30"
            rows="10"></textarea>
        </div>
      </div>

      <div class="my-2">
        <button type="button" class="btn btn-outline-dark">Cancel</button>
        <button
          type="submit"
          class="btn btn-primary ms-2"
          :disabled="!todoUpdated"
          @click.stop="onSave"
        >{{ editing ? 'Update' : 'Create'}}</button>
      </div>

    </div>
  </form>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import _ from 'lodash';

import { getTodoItem, putTodoItem, addTodoItem } from '@/api';
import { useToast } from '../composables/toast';
import CommonInput from './common/CommonInput.vue';
import route from '../router';

export default {
  components: { CommonInput },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const router = useRoute();
    const todoId = router.params.id;

    const todo = ref({
      title: '',
      done: false,
      body: '',
    });
    const originTodo = ref(null);

    const loading = ref(false);

    const { triggerToast } = useToast();
    const triggerErrorToast = () => triggerToast('Error occurred!', 'danger');

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await getTodoItem(todoId);
        todo.value = res.data;
        originTodo.value = { ...res.data };
        loading.value = false;
      } catch (err) {
        await triggerErrorToast();
      }
    };

    const statusBtnClass = computed(() => (todo.value.done ? 'btn-success' : 'btn-danger'));
    const statusBtnLabel = computed(() => (todo.value.done ? 'Completed' : 'Incompleted'));

    const toggleTodoStatus = () => {
      todo.value.done = !todo.value.done;
    };

    const todoUpdated = computed(() => !_.isEqual(todo.value, originTodo.value));

    const emptyTitleError = ref('');
    const onSave = async () => {
      if (!todo.value.title) {
        emptyTitleError.value = 'Title is required.';
        return;
      }

      try {
        let res;
        const data = {
          title: todo.value.title,
          done: todo.value.done,
          body: todo.value.body,
        };
        if (props.editing) {
          res = await putTodoItem(todoId, data);
        } else {
          res = await addTodoItem(data);
          todo.value.title = '';
          todo.value.body = '';
        }
        const toastMsg = `Successfully ${props.editing ? 'updated' : 'created'}!`;
        await triggerToast(toastMsg);
        originTodo.value = { ...res.data };

        await route.push({ name: 'Todos' });
        // eslint-disable-next-line consistent-return
        return res;
      } catch (err) {
        await triggerErrorToast();
        throw new Error(err);
      }
    };

    const onTitleChanged = (value) => { todo.value.title = value; };

    if (props.editing) {
      getTodo();
    }

    return {
      todo,
      loading,
      statusBtnClass,
      statusBtnLabel,
      toggleTodoStatus,
      todoUpdated,
      emptyTitleError,
      onSave,
      onTitleChanged,
    };
  },
};
</script>

<style scoped>
</style>
