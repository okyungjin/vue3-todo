<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form @submit.prevent="onSubmit"> <!-- modifier directive -->
      <div class="d-flex">
        <div class="flex-grow-1 me-2">
          <input class="form-control" type="text" v-model="todo" placeholder="Type New Todo">
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
      <div class="mt-2" v-show="hasError" style="color: red">This field cannot be empty</div>
    </form>

    <div v-if="!todos.length" class="mt-2">추가된 Todo가 없습니다.</div>
    <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input class="form-check-input" type="checkbox" v-model="todo.done" >
<!--          <label class="form-check-label" :style="todo.done ? todoStyle : {}">{{ todo.title }}</label>-->
          <label class="form-check-label" :class="{ done: todo.done }">{{ todo.title }}</label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const todo = ref('');
    const todos = ref([
      { id: Date.now(), title: 'Sample Todo', done: false }
    ]);

    const onSubmit = () => {
      if (!todo.value) {
        hasError.value = true;
        return;
      }

      todos.value.push({
        id: Date.now(),
        title: todo.value,
        done: false,
      });
      hasError.value = false;
      todo.value = '';
    }

    const hasError = ref(false);

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'grey',
    }

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);

    }

    return {
      todo,
      todos,
      onSubmit,
      hasError,
      todoStyle,
      deleteTodo,
    }
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>