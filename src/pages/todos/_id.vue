<template>
  <h2>To-Do Page</h2>
  <TodoForm :editing="true"></TodoForm>
</template>

<script>
import TodoForm from '../../components/TodoForm.vue';

export default {
  components: {
    TodoForm,
  },
};
</script>
