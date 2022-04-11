<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form @submit.prevent="onSubmit" class="d-flex"> <!-- modifier directive -->
      <div class="flex-grow-1 mr-2">
        <input class="form-control" type="text" v-model="todo" placeholder="Type New Todo">
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </form>

    <div v-for="{ id, title } in todos" :key="id" class="card mt-2">
      <div class="card-body p-2">{{ title }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const todo = ref('');
    const todos = ref([
      { id: Date.now(), title: 'Sample Todo' }
    ]);

    const onSubmit = () => {
      todos.value.push({
        id: Date.now(),
        title: todo.value,
      })
    }

    return {
      todo,
      todos,
      onSubmit,
    }
  }
}
</script>