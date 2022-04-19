<template>
  <div class="form-group mb-2">
    <label class="my-2">{{ label }}</label>
    <input type="text" class="form-control" :value="inputText" @input.prevent="onChanged">
    <div class="text-red mt-1" v-if="showErrorMessage">{{ displayErrorMessage }}</div>
  </div>
</template>

<script>
import { onUnmounted, ref } from 'vue';

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const showErrorMessage = ref(false);
    const displayErrorMessage = `${props.errorMessage ?? `${props.label} is required.`}`;
    const inputText = ref(props.modelValue);

    let timer;
    const onChanged = (evt) => {
      inputText.value = evt.target.value;
      showErrorMessage.value = props.required && !inputText.value;

      clearTimeout(timer);
      timer = setTimeout(() => {
        emit('update:modelValue', inputText);
      }, 500);
    };

    onUnmounted(() => {
      clearTimeout(timer);
    });

    return {
      showErrorMessage,
      onChanged,
      displayErrorMessage,
      inputText,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}
</style>
