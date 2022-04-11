<template>
  <p>{{ greeting(name) }}</p>
  <p>{{ greet }}</p>
</template>

<script>
export default {
  setup() {
    const name = 'KyungJin Jung';

    const greeting = (name) => `Hello, ${name}`;

    const greet = greeting(name);

    return {
      name,
      greeting,
      greet,
    }
  }
}
</script>
