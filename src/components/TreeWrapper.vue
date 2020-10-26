<template>
  <tree-virtual-scroller
    v-if="options.useVirtualScroller"
    :items="renderedTree"
    key-field="id"
    :min-item-size="17.5"
    :style="{maxHeight: treeHeight}"
  >
    <template #default="{item}">
      <tree-node
        :node="item"
        :options="options"
        :is-root="item.__depth === 0"
        :depth="item.__depth"
        @arrow-click="onarrowClick"
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
  </tree-virtual-scroller>
  <div v-else>
    <tree-node
      v-for="node in renderedTree"
      :key="node.id"
      :node="node"
      :options="options"
      :is-root="node.__depth === 0"
      :depth="node.__depth"
      @arrow-click="onarrowClick"
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
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import TreeNode from '@/components/TreeNode.vue';
import { IFullTreeOptions } from '@/models/tree-options';

import isExpanded from '@/functions/tree/is-expanded';
import isNodeVisible from '@/functions/tree/is-node-visible';
import flattenTree from '@/functions/tree/flatten-tree';
import NodeState from '@/enums/node-state';
import setVisibilityEvaluator from '@/services/node-evaluators/set-visibility-evaluator';
import treeParser from '@/services/tree-parser';
import arrayDifference from '@/functions/array-difference';
import TreeVirtualScroller from '@/components/TreeVirtualScroller.vue';

interface IData {
    renderedTree: IProcessedTreeNode[];
}

export default Vue.extend({
  name: 'TreeWrapper',
  components: {
    TreeNode,
    TreeVirtualScroller,
  },
  props: {
    roots: {
      type: Array as PropType<IProcessedTreeNode[]>,
      required: true,
    },
    options: {
      type: Object as PropType<IFullTreeOptions>,
      required: true,
    },
    treeHeight: {
      type: String,
      required: true,
    },
  },
  data(): IData {
    return {
      renderedTree: [],
    };
  },
  watch: {
    roots: {
      immediate: true,
      handler(newRoots: IProcessedTreeNode[]) {
        let flatTree: IProcessedTreeNode[] = [];
        newRoots.forEach((root) => {
          flatTree = [...flatTree, ...flattenTree(root)];
        });

        this.renderedTree = this.getVisibleNodes(flatTree);
      },
    },
  },
  methods: {
    async onarrowClick(node: IProcessedTreeNode) {
      const expanded = isExpanded(node);
      if (expanded) {
        this.handleExpandedNode(node);
      } else {
        this.handleCollapsedNode(node);
      }

      this.renderedTree = this.getNewRenderNodes(node);
    },

    async handleExpandedNode(node: IProcessedTreeNode) {
      node.__state = NodeState.CLOSED;
      node.children = await treeParser.traverseTree([setVisibilityEvaluator], {
        trees: node.children,
        payload: { $_setVisibilityEvaluator: false },
      });
    },

    handleCollapsedNode(node: IProcessedTreeNode) {
      node.__state = NodeState.OPEN;
      node.children.forEach((n) => { n.__visible = true; });
    },

    getVisibleNodes(nodes: IProcessedTreeNode[]) {
      return nodes.filter((node) => isNodeVisible(node));
    },

    getNewRenderNodes(node: IProcessedTreeNode) {
      let updatedNodes: IProcessedTreeNode[] = [];
      const changingNodes = flattenTree(node, node.__depth);

      if (node.__state === NodeState.OPEN) {
        this.renderedTree.forEach((n) => {
          if (n.id !== node.id) {
            updatedNodes.push(n);
          } else {
            updatedNodes = [...updatedNodes, ...this.getVisibleNodes(changingNodes)];
          }
        });
      }

      if (node.__state === NodeState.CLOSED) {
        // Do not add root of the subtree, only descendants
        const childrenNodes = changingNodes.slice(1);
        updatedNodes = arrayDifference(this.renderedTree, 'id', childrenNodes, 'id');
      }

      return updatedNodes;
    },
  },
});
</script>
