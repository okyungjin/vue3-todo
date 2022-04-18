<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete Confirm</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="onClose"
          ></button>
        </div>
        <div class="modal-body">
          {{ todoTitle }} 항목을 삭제하시겠습니까?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
          <button type="button" class="btn btn-danger" @click="onDelete">Delete Todo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    todoTitle: {
      type: String,
      required: true,
    },
  },
  setup(_, { emit }) {
    const onClose = () => emit('close');
    const onDelete = () => emit('delete');

    return {
      onClose,
      onDelete,
    };
  },
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
