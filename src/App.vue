<template>
  <div class="container">
    <h2 class="mt-2">To-Do List</h2>

    <input
      class="form-control mb-2"
      type="text"
      v-model="searchText"
      placeholder="Search">
    <hr />

    <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm>
    <div>{{ error }}</div>

    <TodoList :todos="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"></TodoList>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import { postTodo } from '../api';

export default {
  setup() {
    const searchText = ref('');
    const error = ref('');

    const todos = ref([
      { id: Date.now(), title: 'Sample Todo', done: false },
    ]);

    const filteredTodos = computed(
      () => todos.value.filter((todo) => todo.title.includes(searchText.value)),
    );

    const addTodo = (todo) => {
      error.value = '';
      const newTodo = {
        title: todo.title,
        done: todo.done,
      };
      postTodo(newTodo)
        .then(() => todos.value.push(todo))
        .catch(() => { error.value = 'Error occured'; });
    };

    const deleteTodo = (index) => todos.value.splice(index, 1);

    const toggleTodo = (index) => {
      todos.value[index].done = !todos.value[index].done;
    };

    return {
      searchText,
      filteredTodos,
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      error,
    };
  },
  components: {
    TodoSimpleForm,
    TodoList,
  },
};
</script>

<style>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>
