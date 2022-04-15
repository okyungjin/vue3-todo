// import ToastComponent from '../components/index.vue';
//
// const useToastTest = (globalProps = {}) => ({
//   open(options) {
//     let message = null;
//     if (typeof options === 'string') message = options;
//
//     const defaultProps = {
//       message,
//     };
//
//     const propsData = { ...defaultProps, ...globalProps, ...options };
//
//     const instance = createComponent(ToastComponent, propsData, document.body);
//
//     return {
//       dismiss: instance.ctx.dismiss,
//     };
//   },
// });

// const useToast = () => {
//   const showToast = ref(false);
//   const toastType = ref('success');
//   const toastMessage = ref('');
//
//   let toastTimer;
//   const triggerToast = (message, type = 'success') => {
//     toastMessage.value = message;
//     toastType.value = type;
//     showToast.value = true;
//     toastTimer = setTimeout(() => {
//       console.log('timeout');
//       toastMessage.value = '';
//       toastType.value = '';
//       showToast.value = false;
//     }, 3000);
//   };
//
//   onUnmounted(() => {
//     console.log('onUnmounted');
//     clearTimeout(toastTimer);
//   });
//
//   return {
//     showToast,
//     toastType,
//     toastMessage,
//     triggerToast,
//     // createComponent,
//   };
// };

export {
  // useToast,
  // useToastTest,
};
