<template>
  <dynamic-scroller
    :items="items"
    :min-item-size="minItemSize"
    :key-field="keyField"
    :buffer="800"
  >
    <template v-slot="{ item, index, active }">
      <dynamic-scroller-item
        :item="item"
        :active="active"
        :size-dependencies="[
          item.name,
        ]"
        :data-index="index"
      >
        <!--
         @slot default scoped slot<br>
         <b>SCOPED SLOT VARIABLES</b> <br>
          1. `item` - Current item being iterated over<br>
          2. `index` - Current item index<br>
          3. `active` - Is item currently visible
        -->
        <slot
          :item="item"
          :index="index"
          :active="active"
        />
      </dynamic-scroller-item>
    </template>
  </dynamic-scroller>
</template>
<script lang="ts">
import Vue from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';

export default Vue.extend({
  name: 'RcDynamicScroller',
  components: {
    DynamicScroller,
    DynamicScrollerItem,
  },
  props: {
    /**
     * Array of items to be iterated over
     */
    items: {
      type: Array,
      required: true,
    },
    /**
     * Minimal item height, to simplify dynamic height calculations
     */
    minItemSize: {
      type: Number,
      required: true,
    },
    /**
     * Name of the field uniquely identifying each item (preferably some ID)
     */
    keyField: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="postcss">
/* purgecss start ignore */
@import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
/* purgecss end ignore */
</style>
