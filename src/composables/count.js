import { reactive, toRefs } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useCount = () => {
  const state = reactive({
    count: 0,
  });
  return toRefs(state);
};
