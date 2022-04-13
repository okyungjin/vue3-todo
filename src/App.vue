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
import { getTodoList, addTodoItem, deleteTodoItem } from '../api';

export default {
  setup() {
    const searchText = ref('');
    const error = ref('');

    const todos = ref([]);

    const filteredTodos = computed(
      () => todos.value.filter((todo) => todo.title.includes(searchText.value)),
    );

    const getTodos = async () => {
      try {
        const res = await getTodoList();
        todos.value = res.data;
        console.log(res);
      } catch (err) {
        console.error(err);
        error.value = 'Error occured';
      }
    };
    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      const newTodo = {
        title: todo.title,
        done: todo.done,
      };
      try {
        await addTodoItem(newTodo);
        todos.value.push(todo);
      } catch (_) {
        error.value = 'Error occured';
      }
    };

    const deleteTodo = async (index) => {
      const todoId = todos.value[index].id;
      try {
        await deleteTodoItem(todoId);
        todos.value.splice(index, 1);
      } catch (err) {
        console.error(err);
        error.value = 'Error occured';
      }
    };

    const toggleTodo = (index) => {
      todos.value[index].done = !todos.value[index].done;
    };

    return {
      getTodos,
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
