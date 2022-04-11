<template>
  <h1>Text Input 양방향 바인딩</h1>
  <div>{{ name }}</div>
  <input type="text" v-model="name">
  <button class="btn btn-primary" @click="submitName">Submit</button>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      let name = ref('KyungJin Jung');

      const submitName = () => console.log(name.value);

      return {
        name,
        submitName,
      }
    }
  }
</script>

<style scoped>

</style>