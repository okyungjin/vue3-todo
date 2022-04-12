<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm>


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
import TodoSimpleForm from './components/TodoSimpleForm';

export default {
  setup() {
    const todos = ref([
      { id: Date.now(), title: 'Sample Todo', done: false }
    ]);

    const addTodo = (todo) => todos.value.push(todo);

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
      console.log('deleteTodo', index)
    }

    return {
      todos,
      addTodo,
      deleteTodo,
    }
  },
  components: {
    TodoSimpleForm,
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>