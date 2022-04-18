<template>
  <div v-if="!todos.length" class="mt-2">
    There is nothing to display.
  </div>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center pointer" @click="moveToTodoItem(todo.id)">
      <div class="flex-grow-1">
        <input
                class="form-check-input"
                type="checkbox"
                :value="todo.done"
                @change="toggleTodo(index, $event)"
                @click.stop
        >
        <span class="ms-2" :class="{ done: todo.done }">{{ todo.title }}</span>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="openModal(todo)">Delete</button>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <Modal
      v-if="showModal"
      @close="closeModal"
      @delete="deleteTodo"
    >
      <template #title>Delete Confirm</template>
      <template v-slot:body>{{ todoToDelete.title }} 항목을 삭제하시겠습니까?</template>
      <template #footer>
        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteTodo">Delete Todo</button>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const showModal = ref(false);

    const todoToDelete = ref(null);

    const openModal = (todo) => {
      todoToDelete.value = todo;
      showModal.value = true;
    };

    const closeModal = () => {
      todoToDelete.value = null;
      showModal.value = false;
    };

    const toggleTodo = (index, event) => emit('toggle-todo', index, event.target.checked);

    const deleteTodo = () => {
      emit('delete-todo', todoToDelete.value.id);
      closeModal();
    };

    const router = useRouter();
    const moveToTodoItem = (itemId) => {
      router.push({
        name: 'Todo',
        params: {
          id: itemId,
        },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToTodoItem,
      showModal,
      openModal,
      closeModal,
      todoToDelete,
    };
  },
  components: {
    Modal,
  },
};
</script>

<style scoped>

</style>
