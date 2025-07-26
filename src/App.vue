<template>
  <div class="app-wrapper">
    <div class="background"></div>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

.app-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
}

.background {
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #1d3557, #457b9d, #a8dadc, #f1faee);
  background-size: 400% 400%;
  animation: backgroundShift 20s ease infinite;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  color: #fff;
}

@keyframes backgroundShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
