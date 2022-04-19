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

  <CommonPagination
    :totalItemCount="numOfTodos"
    v-model:currentPage="currentPage"
  ></CommonPagination>
</template>

<script>
import { ref, watch } from 'vue';
import TodoList from '@/components/TodoList.vue';
import {
  getTodoList, addTodoItem, deleteTodoItem, patchTodoItem,
} from '@/api';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';
import CommonPagination from '../../components/common/CommonPagination.vue';

export default {
  setup() {
    const rowsPerPage = 10;

    const searchText = ref('');
    const error = ref('');

    const todos = ref([]);
    const numOfTodos = ref(0);

    const currentPage = ref(1);

    const { triggerToast } = useToast();

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

    watch(currentPage, () => getTodos());

    const onPageChange = (page) => {
      currentPage.value = page;
    };

    const moveToPrevPage = () => {
      currentPage.value -= 1;
      // getTodos();
    };

    const moveToNextPage = () => {
      currentPage.value += 1;
      // getTodos();
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
      numOfTodos,
      moveToCreateTodo,
      currentPage,
      onPageChange,
      moveToPrevPage,
      moveToNextPage,
    };
  },
  components: {
    CommonPagination,
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
