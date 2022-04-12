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

    <div v-for="todo in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="todo.done" >
          <label class="form-check-label" :style="todo.done ? todoStyle : {}">{{ todo.title }}</label>
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
    }

    const hasError = ref(false);

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'grey',
    }

    return {
      todo,
      todos,
      onSubmit,
      hasError,
      todoStyle,
    }
  }
}
</script>