<template>
  <div class="container">
    <h2 class="mt-2">To-Do List</h2>

    <input
      class="form-control mb-2"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo">
    <hr />

    <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm>
    <div>{{ error }}</div>

    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"></TodoList>

    <hr />
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
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import {
  getTodoList, addTodoItem, deleteTodoItem, patchTodoItem,
} from './api';

export default {
  setup() {
    const searchText = ref('');
    const error = ref('');
    const todos = ref([]);
    const rowsPerPage = 10;
    const currentPage = ref(1);
    const numOfTodos = ref(0);
    const numOfPages = computed(() => Math.ceil(numOfTodos.value / rowsPerPage));

    const getTodos = async () => {
      try {
        const res = await getTodoList(currentPage.value, rowsPerPage, searchText.value);
        todos.value = res.data;
        numOfTodos.value = parseInt(res.headers['x-total-count'], 10);
      } catch (err) {
        console.error(err);
        error.value = 'Error occured';
      }
    };
    getTodos();

    let timer = null;
    watch(searchText, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        currentPage.value = 1;
        getTodos();
      }, 500);
    });

    const searchTodo = () => {
      clearTimeout(timer);
      currentPage.value = 1;
      getTodos();
    };

    const addTodo = async (todo) => {
      error.value = '';
      const newTodo = {
        title: todo.title,
        done: todo.done,
      };
      try {
        await addTodoItem(newTodo);
        currentPage.value = 1;
        await getTodos();
      } catch (_) {
        error.value = 'Error occured';
      }
    };

    const deleteTodo = async (index) => {
      const todoId = todos.value[index].id;
      try {
        await deleteTodoItem(todoId);
        await getTodos();
      } catch (err) {
        console.error(err);
        error.value = 'Error occured';
      }
    };

    const toggleTodo = async (index) => {
      const todoId = todos.value[index].id;
      try {
        await patchTodoItem(todoId, { done: !todos.value[index].done });
        todos.value[index].done = !todos.value[index].done;
      } catch (err) {
        console.error(err);
      }
    };

    const pageCounts = (totalCounts) => {
      // eslint-disable-next-line radix
      let result = parseInt(totalCounts / rowsPerPage);
      if (result < 0) throw new Error('Length of todo list is not valid.');
      if (result === 0) return result + 1;
      if (todos.value.length % rowsPerPage > 0) result += 1;
      return result;
    };

    const onPageChange = (page) => {
      currentPage.value = page;
      getTodos();
    };

    const moveToPrevPage = () => {
      if (currentPage.value <= 1) return;
      currentPage.value -= 1;
      getTodos();
    };

    const moveToNextPage = () => {
      if (currentPage.value >= numOfPages.value) return;
      currentPage.value += 1;
      getTodos();
    };

    return {
      todos,
      getTodos,
      searchText,
      searchTodo,
      addTodo,
      deleteTodo,
      toggleTodo,
      error,
      pageCounts,
      onPageChange,
      numOfTodos,
      numOfPages,
      currentPage,
      moveToPrevPage,
      moveToNextPage,
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
.pointer {
  cursor: pointer;
}
</style>
