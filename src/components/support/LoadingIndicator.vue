<template>
  <div class="absolute h-full w-full z-50 opacity-75 bg-white ">
    <div
      class="loader border-solid border-blue-700 border-t-4 border-r-4 m-auto mt-16"
      :style="{width: `${size}px`, height: `${size}px`}"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoadingIndicator',
  props: {
    size: {
      type: Number,
      default: 42,
    },
  },
});
</script>
<style lang="postcss" scoped>
.loader {
  border-radius: 50%;
  animation: loading 0.6s linear infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(200deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
