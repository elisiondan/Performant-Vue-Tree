<template>
  <div>
    <tree-node
      :node="root"
      @item-click="onItemClick"
    />
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue';
import ITreeNode from '@/models/tree-node';
import TreeNode from '@/components/TreeNode.vue';

export default Vue.extend({
  name: 'TreeRoot',
  components: {
    TreeNode,
  },
  props: {
    root: {
      type: Object as PropType<ITreeNode>,
      required: true,
    },
  },
  methods: {
    onItemClick(item: ITreeNode) {
      this.$emit('item-click', item);
    },
  },
});
</script>
