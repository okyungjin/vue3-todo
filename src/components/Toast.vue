<template>
  <div class="toast-box">
    <TransitionGroup name="slide">
      <div
        v-for="{ id, message, type } in toasts" :key="id"
        class="alert"
        :class="`alert-${type}`"
        role="alert"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { useToast } from '../composables/toast';

export default {
  setup() {
    const { toasts } = useToast();

    return {
      toasts,
    };
  },
};
</script>

<style scoped>
.toast-box {
  position: fixed;
  top: 10px;
  right: 10px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
