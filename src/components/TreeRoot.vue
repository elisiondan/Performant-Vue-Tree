<template>
  <tree-node

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
import { cloneDeep } from 'lodash';

const treeTraversalWorker = new WorkerService(
  new Worker('@/workers/tree-traversal-worker.ts', { type: 'module' }),
);

interface IData {
    traversedRoot: IProcessedTreeNode;
}

let fullTree: IProcessedTreeNode = { obj: { id: Number.MAX_SAFE_INTEGER }, children: [] };

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
      traversedRoot: cloneDeep(this.root),
    };
  },

  async created() {
    fullTree = cloneDeep(this.root);
    console.log(fullTree);
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
        tree: fullTree,
        nodeEvaluators: this.options.nodeEvaluators.map((e) => JSONfn.stringify(e)),
        nodeEvaluatorsData: payload,
      } as ITraversalInput);

      this.traversedRoot = result.tree;
    },
  },
});
</script>
