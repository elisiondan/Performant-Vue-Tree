<template>
  <div class="inline-block w-full relative">
    <input
      v-model="inputValue"
      class="border border-gray-400 w-full px-2 leading-8"
      :placeholder="placeholder"
      data-test="pvt-input-field"
      @change="$emit('change', inputValue)"
    >
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PvtInput',
  components: {
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  computed: {
    inputValue: {
      get(): string { return this.localValue; },
      set(value: string): void {
        this.localValue = value;
        this.$emit('input', value);
      },
    },
  },
});
</script>
