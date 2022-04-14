<template>
  <div v-if="!todos.length" class="mt-2">
    There is nothing to display.
  </div>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center pointer" @click="moveToTodoItem(todo.id)">
      <div class="form-check flex-grow-1">
        <input
                class="form-check-input"
                type="checkbox"
                :value="todo.done"
                @change="toggleTodo(index, $event)"
                @click.stop
        >
        <label class="form-check-label" :class="{ done: todo.done }">{{ todo.title }}</label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const toggleTodo = (index, event) => emit('toggle-todo', index, event.target.checked);

    const deleteTodo = (index) => emit('delete-todo', index);

    const router = useRouter();
    const moveToTodoItem = (itemId) => {
      router.push({
        name: 'Todo',
        params: {
          id: itemId,
        },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToTodoItem,
    };
  },
};
</script>

<style scoped>

</style>
