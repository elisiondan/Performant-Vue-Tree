<template>
  <dynamic-scroller
    v-if="options.virtualScrolling.enableVariableSize"
    class="virtual-scroller"
    :items="items"
    :min-item-size="options.virtualScrolling.itemSize"
    :key-field="options.virtualScrolling.vueVirtualScrollerOptions.keyField"
    :direction="options.virtualScrolling.vueVirtualScrollerOptions.direction"
    :buffer="options.virtualScrolling.vueVirtualScrollerOptions.buffer"
    :size-field="options.virtualScrolling.vueVirtualScrollerOptions.sizeFiled"
    :type-field="options.virtualScrolling.vueVirtualScrollerOptions.typeField"
    :page-mode="options.virtualScrolling.vueVirtualScrollerOptions.pageMode"
    :prerender="options.virtualScrolling.vueVirtualScrollerOptions.prerender"
    :emit-update="options.virtualScrolling.vueVirtualScrollerOptions.emitUpdate"
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
  <recycle-scroller
    v-else
    v-slot="{ item }"
    class="virtual-scroller"
    :items="items"
    :item-size="options.virtualScrolling.itemSize"
    :key-field="options.virtualScrolling.vueVirtualScrollerOptions.keyField"
    :direction="options.virtualScrolling.vueVirtualScrollerOptions.direction"
    :buffer="options.virtualScrolling.vueVirtualScrollerOptions.buffer"
    :size-field="options.virtualScrolling.vueVirtualScrollerOptions.sizeFiled"
    :type-field="options.virtualScrolling.vueVirtualScrollerOptions.typeField"
    :page-mode="options.virtualScrolling.vueVirtualScrollerOptions.pageMode"
    :prerender="options.virtualScrolling.vueVirtualScrollerOptions.prerender"
    :emit-update="options.virtualScrolling.vueVirtualScrollerOptions.emitUpdate"
  >
    <!--
         @slot default scoped slot<br>
         <b>SCOPED SLOT VARIABLES</b> <br>
          1. `item` - Current item being iterated over<br>
        -->
    <slot
      :item="item"
    />
  </recycle-scroller>
</template>
<script lang="ts">
import { IFullTreeOptions } from '@/models/tree-options';
import Vue, { PropType } from 'vue';
import { DynamicScroller, DynamicScrollerItem, RecycleScroller } from 'vue-virtual-scroller';

export default Vue.extend({
  name: 'RcDynamicScroller',
  components: {
    DynamicScroller,
    DynamicScrollerItem,
    RecycleScroller,
  },
  props: {
    /**
     * Array of items to be iterated over
     */
    items: {
      type: Array,
      required: true,
    },
    options: {
      type: Object as PropType<IFullTreeOptions>,
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
