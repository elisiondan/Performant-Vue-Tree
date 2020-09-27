<template>
  <tree-node
    v-if="!root.__hidden && !root.__filtered"
    :node="root"
    :options="options"
    :is-root="true"
    @item-click="onItemClick"
  >
    <template #prependLabel="data">
      <slot
        name="prependLabel"
        :data="data"
      />
    </template>

    <template #appendLabel="data">
      <slot
        name="appendLabel"
        :data="data"
      />
    </template>
  </tree-node>
</template>

<script lang='ts'>
/* eslint-disable no-param-reassign */
import Vue, { PropType } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import TreeNode from '@/components/TreeNode.vue';
import { IFullTreeOptions } from '@/models/tree-options';

import isExpanded from '@/functions/is-expanded';
import NodeState from '@/enums/node-state';

interface IData {
    traversedRoot: IProcessedTreeNode;
}

export default Vue.extend({
  name: 'TreeRoot',
  components: {
    TreeNode,
  },
  props: {
    root: {
      type: Object as PropType<IProcessedTreeNode>,
      required: true,
    },
    options: {
      type: Object as PropType<IFullTreeOptions>,
      required: true,
    },
  },
  methods: {
    onItemClick(node: IProcessedTreeNode) {
      if (isExpanded(node)) {
        node.__state = NodeState.CLOSED;
      } else {
        node.__state = NodeState.OPEN;
      }

      this.$emit('item-click', node);
      this.$forceUpdate();
    },
  },
});
</script>
