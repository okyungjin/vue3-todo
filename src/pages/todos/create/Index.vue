<template>
  <TodoForm>
    <template #submit-btn="{ type, defaultClass, value }">
      <button
        :type="type"
        :class="defaultClass"
        @click="createTodo(value)"
        :disabled="!value"
      >Create</button>
    </template>
  </TodoForm>
<!--  {{ $toast('hi') }}-->
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';
import { inject } from 'vue';
import { addTodoItem } from '../../../api';
// import { useToast } from '../../../composables/toast';

export default {
  setup() {
    const $toast = inject('$toast');
    // toast.open('console.log toast');

    // const { triggerToast } = useToast();

    // const toast = inject('$toast');
    const createTodo = async (todoTitle) => {
      // this.$toast.open('hi');

      $toast.open('HELLO');
      if (!todoTitle) {
        return;
      }

      const newTodo = { title: todoTitle, done: false };
      try {
        await addTodoItem(newTodo);
        // triggerToast('Successfully saved!');
      } catch (_) {
        // triggerToast('Error occurred!', 'danger');
      }
    };

    return {
      createTodo,
    };
  },
  components: {
    TodoForm,
  },
};
</script>

<style scoped>

</style>
