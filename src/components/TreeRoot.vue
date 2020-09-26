<template>
  <tree-node
    v-if="!traversedRoot.__hidden && !traversedRoot.__filtered"
    :node="traversedRoot"
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
import WorkerService from '@/services/worker-service';
import { IItraversalOutput, ITraversalInput } from '@/workers/tree-traversal-worker';

import isExpanded from '@/functions/is-expanded';
import NodeState from '@/enums/node-state';
import treeObserver from '@/services/tree-observer';

// @ts-ignore
import JSONfn from 'json-fn';

const treeTraversalWorker = new WorkerService(
  new Worker('@/workers/tree-traversal-worker.ts', { type: 'module' }),
);

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
  data() {
    return {
      traversedRoot: this.root,
    };
  },
  async created() {
    treeObserver.subscribe(this.root.obj.id, this.traverseTree);
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
    async traverseTree(payload: any) {
      const result = await treeTraversalWorker.postMessage<IItraversalOutput<IProcessedTreeNode>>({
        tree: this.root,
        nodeEvaluators: this.options.nodeEvaluators.map((e) => JSONfn.stringify(e)),
        nodeEvaluatorsData: payload,
      } as ITraversalInput);

      this.traversedRoot = result.tree;
    },
  },
});
</script>
