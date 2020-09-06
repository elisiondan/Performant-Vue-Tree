<template>
  <div>
    <tree-node
      :node="root"
      @arrow-click="onClick"
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
    onClick() {
      console.warn('hi');
      this.$emit('hi');
    },
  },
});
</script>
