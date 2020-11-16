<template functional>
  <clr-icon
    :shape="props.name"
    :size="props.size"
    class="inline-block"
    :dir="props.dir"
    @click="() => listeners.click && listeners.click()"
  />
</template>

<script lang="tsx">
import Vue from 'vue';
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';

export default Vue.extend({
  name: 'ClarityIcon',
  functional: true,
  props: {
    /**
     * Clarity icon name, for options see https://clarity.design/icons#core-shapes<br>
     * All custom icons are shown in the examples below.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     *  Size in pixels (will be converted to font size)
     */
    size: {
      type: Number,
      default: 24,
    },
    /**
     * Direction of the icon `[up|right|down|left]`<br>
     * Rotates the icon 0, 90, 180 or 270 degrees.
     */
    dir: {
      type: String,
      validator: (prop: string) => ['up', 'down', 'left', 'right'].includes(prop),
      default: 'up',
    },
  },
});
</script>

<style lang="postcss">
/* purgecss start ignore */
@import "@clr/icons/clr-icons.min.css";
/* purgecss end ignore */
</style>
