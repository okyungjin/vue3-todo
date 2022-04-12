<template>
  <div class="container">
    <h2 class="mt-2">To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm>
    <TodoList :todos="todos" @toggle-todo="toggleTodo"></TodoList>
  </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm';
import TodoList from './components/TodoList';

export default {
  setup() {
    const todos = ref([
      { id: Date.now(), title: 'Sample Todo', done: false }
    ]);

    const addTodo = (todo) => todos.value.push(todo);

    const deleteTodo = (index) => todos.value.splice(index, 1);

    const toggleTodo = (index) => todos.value[index].done = !todos.value[index].done;

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
    }
  },
  components: {
    TodoSimpleForm,
    TodoList,
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>