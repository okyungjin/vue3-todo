<template>
  <div class="d-flex justify-content-between my-3">
    <h2 class="mt-2">To-Do List</h2>
    <button class="btn btn-primary" @click="moveToCreateTodo">Create Todo</button>
  </div>

  <input
    class="form-control mb-2"
    type="text"
    v-model="searchText"
    placeholder="Search"
    @keyup.enter="searchTodo">
  <hr />

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
  <Toast v-if="showToast" :message="toastMessage" :type="toastType"></Toast>
</template>

<script>
import { ref, computed, watch } from 'vue';
// import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import {
  getTodoList, addTodoItem, deleteTodoItem, patchTodoItem,
} from '@/api';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const searchText = ref('');
    const error = ref('');
    const todos = ref([]);
    const rowsPerPage = 10;
    const currentPage = ref(1);
    const numOfTodos = ref(0);
    const numOfPages = computed(() => Math.ceil(numOfTodos.value / rowsPerPage));

    const {
      showToast, toastType, toastMessage, triggerToast,
    } = useToast();

    const getTodos = async () => {
      try {
        const res = await getTodoList(currentPage.value, rowsPerPage, searchText.value);
        todos.value = res.data;
        numOfTodos.value = parseInt(res.headers['x-total-count'], 10);
      } catch (err) {
        triggerToast('Error occured', 'danger');
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
        triggerToast('Error occurred!', 'danger');
      }
    };

    const deleteTodo = async (todoId) => {
      try {
        await deleteTodoItem(todoId);
        await getTodos();
      } catch (_) {
        triggerToast('Error occurred!', 'danger');
      }
    };

    const toggleTodo = async (index, checked) => {
      const todoId = todos.value[index].id;
      try {
        await patchTodoItem(todoId, { done: checked });
        todos.value[index].done = checked;
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

    const router = useRouter();
    const moveToCreateTodo = () => {
      router.push({
        name: 'TodoCreate',
      });
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
      showToast,
      toastMessage,
      toastType,
      moveToCreateTodo,
    };
  },
  components: {
    // TodoSimpleForm,
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
