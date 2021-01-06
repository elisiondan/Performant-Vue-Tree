<template>
  <tree-virtual-scroller
    v-if="options.virtualScrolling.useVirtualScrolling"
    :items="renderedTree"
    :options="options"
    :style="{maxHeight: treeHeight}"
    data-test="virtual-tree-wrapper"
    class="tree-wrapper"
  >
    <template #default="{item}">
      <tree-node
        v-if="item"
        :node="item"
        :options="options"
        :is-root="item.__depth === 0"
        :active-node-id="activeNodeId"
        data-test="virtual-tree-wrapper-node"
        @arrow-click="onArrowClick"
        @node-click="onNodeClick"
      >
        <template #nodeContent="{nodeData}">
          <slot
            name="nodeContent"
            :nodeData="nodeData"
          />
        </template>

        <template #nodePrependLabel="{nodeData}">
          <slot
            name="nodePrependLabel"
            :nodeData="nodeData"
          />
        </template>

        <template #nodeLabel="{nodeData}">
          <slot
            name="nodeLabel"
            :nodeData="nodeData"
          />
        </template>
      </tree-node>
    </template>
  </tree-virtual-scroller>
  <div
    v-else
    class="tree-wrapper"
    data-test="tree-wrapper"
  >
    <tree-node
      v-for="node in renderedTree"
      :key="node.id"
      :node="node"
      :options="options"
      :is-root="node.__depth === 0"
      :active-node-id="activeNodeId"
      data-test="tree-wrapper-node"
      @arrow-click="onArrowClick"
      @node-click="onNodeClick"
    >
      <template #nodeContent="{nodeData}">
        <slot
          name="nodeContent"
          :nodeData="nodeData"
        />
      </template>

      <template #nodePrependLabel="{nodeData}">
        <slot
          name="nodePrependLabel"
          :nodeData="nodeData"
        />
      </template>

      <template #nodeLabel="{nodeData}">
        <slot
          name="nodeLabel"
          :nodeData="nodeData"
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
import TreeVirtualScroller from '@/components/TreeVirtualScroller.vue';
import WaitTypes from '@/enums/wait-types';
import loaderService from '@/services/loader-service';

interface IData {
    renderedTree: IProcessedTreeNode[];
    activeNodeId: string | number;
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
      activeNodeId: '',
    };
  },
  computed: {
    isVirtualScrollerEnabled(): boolean {
      return this.options.virtualScrolling.useVirtualScrolling;
    },
  },
  watch: {
    roots: {
      immediate: true,
      handler(newRoots: IProcessedTreeNode[]) {
        loaderService.start(WaitTypes.FLATTENING_TREE);
        let processedTree: IProcessedTreeNode[] = [];
        if (this.options.virtualScrolling.useVirtualScrolling) {
          newRoots.forEach((root) => {
            processedTree = [
              ...processedTree,
              ...flattenTree(root, 0, processedTree.length, [], this.isExpandableNode),
            ];
          });
        } else {
          processedTree = newRoots
            .map((root) => { root.__depth = 0; return root; })
            .sort((a, b) => (+this.isExpandableNode(b)) - (+this.isExpandableNode(a)));
        }

        this.renderedTree = this.getVisibleNodes(processedTree);
        loaderService.end(WaitTypes.FLATTENING_TREE);
      },
    },
  },
  methods: {
    async onArrowClick(node: IProcessedTreeNode) {
      const expanded = isExpanded(node);
      let changingNodes: IProcessedTreeNode[] = [];

      if (expanded) {
        await this.collapseExpandedNode(node);
        changingNodes = this.getChangingNodesForNewlyCollapsedNode(node);
      } else {
        await this.expandCollapsedNode(node);
        changingNodes = this.getChangingNodesForNewlyExpandedNode(node);
      }

      this.updateRenderedTree(node, changingNodes);
    },

    getChangingNodesForNewlyCollapsedNode(node: IProcessedTreeNode) {
      const start = 1 + this.renderedTree.findIndex((n) => n.id === node.id);
      const firstFollowingNodeAtSameorLowerDepth = this.renderedTree
        .findIndex((n) => {
          if (n.__depth !== undefined
          && node.__depth !== undefined
          && n.__index !== undefined
          && node.__index !== undefined) {
            return n.__depth <= node.__depth // is preceding or at same level
            && n.id !== node.id // is different node
            && n.__index > node.__index; // comes later (is not ancestor)
          }
          console.error('Undefined depth when expected');
          return false;
        });
      const end = firstFollowingNodeAtSameorLowerDepth > 0
        ? firstFollowingNodeAtSameorLowerDepth
        : this.renderedTree.length;
      return this.renderedTree.slice(start, end);
    },

    getChangingNodesForNewlyExpandedNode(node: IProcessedTreeNode) {
      return node.children;
    },

    onNodeClick(node: IProcessedTreeNode) {
      this.activeNodeId = node.id;
    },

    async collapseExpandedNode(node: IProcessedTreeNode) {
      node.__state = NodeState.CLOSED;
      node.children = await treeParser.traverseTree([setVisibilityEvaluator], {
        trees: node.children,
        payload: { $_setVisibilityEvaluator: false },
      });
    },

    async expandCollapsedNode(node: IProcessedTreeNode) {
      node.__state = NodeState.OPEN;
      loaderService.start(WaitTypes.TOGGLING_NODE_STATE);
      node.children = await this.options.getChildren(node);
      node.children = node.children
        .sort((a, b) => (+this.isExpandableNode(b)) - (+this.isExpandableNode(a)));
      loaderService.end(WaitTypes.TOGGLING_NODE_STATE);
      node.children.forEach((n) => { n.__visible = true; });
    },

    getVisibleNodes(nodes: IProcessedTreeNode[]) {
      return nodes.filter((node) => isNodeVisible(node));
    },

    updateRenderedTree(root: IProcessedTreeNode, changingNodes: IProcessedTreeNode[]) {
      if (this.isVirtualScrollerEnabled && changingNodes.length > 0) {
        const expanded = isExpanded(root);
        const index = this.renderedTree.findIndex((n) => n.id === root.id);
        if (expanded) {
          // + 1 for leaving the root node untouched
          this.renderedTree.splice(index + 1, 0, ...changingNodes);
        } else {
          this.renderedTree.splice(index + 1, changingNodes.length);
        }
      } else {
        this.$forceUpdate();
      }
    },

    isExpandableNode(node: IProcessedTreeNode) {
      return this.options.isExpandable(node);
    },
  },
});
</script>
