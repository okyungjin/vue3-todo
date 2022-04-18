<template>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent>
    <div class="row">
      <div class="col-6">
        <div class="form-group mb-2">
          <label class="my-2">Title</label>
          <input type="text" class="form-control" v-model="todo.title">
          <div class="text-red mt-1" v-if="emptyTitleError">{{ emptyTitleError }}</div>
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
  <transition name="slide">
    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
    ></Toast>
  </transition>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import _ from 'lodash';

import { getTodoItem, putTodoItem, addTodoItem } from '@/api';
import { useToast } from '@/composables/toast';

export default {
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const todoId = route.params.id;

    const todo = ref({
      title: '',
      done: false,
      body: '',
    });
    const originTodo = ref(null);

    const loading = ref(false);

    const {
      showToast, toastType, toastMessage, triggerToast,
    } = useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await getTodoItem(todoId);
        todo.value = res.data;
        originTodo.value = { ...res.data };
        loading.value = false;
      } catch (err) {
        triggerToast('Error occurred!', 'danger');
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
        triggerToast(toastMsg);
        originTodo.value = { ...res.data };
        // eslint-disable-next-line consistent-return
        return res;
      } catch (err) {
        triggerToast('Error occurred!', 'danger');
        throw new Error(err);
      }
    };

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
      showToast,
      toastMessage,
      toastType,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
