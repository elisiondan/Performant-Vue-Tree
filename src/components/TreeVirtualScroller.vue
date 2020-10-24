<template>
  <recycle-scroller
    class="scroller"
    :items="items"
    :item-size="itemSize"
    key-field="id"
  >
    <template v-slot="{item, index, active}">
      <slot
        :item="item"
        :index="index"
        :active="active"
      />
    </template>
  </recycle-scroller>
</template>

<script lang="ts">
import Vue from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';

export default Vue.extend({
  name: 'TreeVirtualScroller',
  components: {
    RecycleScroller,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemSize: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="postcss" scoped>
/* purgecss start ignore */
@import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
/* purgecss end ignore */
</style>
