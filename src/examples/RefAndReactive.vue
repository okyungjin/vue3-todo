<template>
  <div>
    <p>{{ name }}</p>
    <input type="text" v-model="name">
    <button class="btn btn-primary" @click="updateName">Change Name</button>
  </div>

  <div>
    <p>{{ reactiveInfo.job }}</p>
    <button class="btn btn-primary" @click="updateReactiveInfo">(Reactive) Change Info</button>
  </div>

  <div>
    <p>{{ refInfo.job }}</p>
    <button class="btn btn-primary" @click="updateRefInfo">(Ref) Change Info</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    let name = ref('KyungJin Jung');

    const reactiveInfo = reactive({
      job: 'developer',
    });

    const refInfo = ref({
      job: 'developer',
    });

    const greeting = (name) => `Hello, ${name}`;

    const greet = greeting(name);

    const updateName = () => name.value = '정경진';

    const updateReactiveInfo = () => reactiveInfo.job = '(Reactive) Frontend Developer';

    const updateRefInfo = () => refInfo.value.job = '(Ref) Frontend Developer';

    return {
      name,
      reactiveInfo,
      refInfo,
      greeting,
      greet,
      updateName,
      updateReactiveInfo,
      updateRefInfo,
    }
  },
}
</script>

<style scoped>

</style>