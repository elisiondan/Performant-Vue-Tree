<template>
  <div>
    <tree-root
      v-for="root in data.trees"
      :key="root.id"
      :root="root"
      @item-click="($event) => $emit('item-click', $event)"
    />
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue';
import ITreeData from '@/models/tree-data';

import TreeRoot from '@/components/TreeRoot.vue';

export default Vue.extend({
  name: 'Tree',
  components: {
    TreeRoot,
  },
  props: {
    data: {
      type: Object as PropType<ITreeData>,
      required: true,
    },
  },
});
</script>
