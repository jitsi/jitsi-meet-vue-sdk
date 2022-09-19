<script setup>
import JitsiExample from "./components/JitsiExample.vue";
import JaasExample from "./components/JaasExample.vue";
</script>

<template>
  <div class="App">
    <JitsiExample />
    <JaasExample />
  </div>
</template>

<style scoped>
.App {
  padding: 0 8rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
