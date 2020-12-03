<template>
  <tree-virtual-scroller
    v-if="options.virtualScrolling.useVirtualScrolling"
    :items="renderedTree"
    :options="options"
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
        <template #nodeContent="nodeData">
          <slot
            name="nodeContent"
            :data="nodeData"
          />
        </template>

        <template #nodePrependLabel="nodeData">
          <slot
            name="nodePrependLabel"
            :data="nodeData"
          />
        </template>

        <template #nodeLabel="nodeData">
          <slot
            name="nodeLabel"
            :data="nodeData"
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
import TreeVirtualScroller from '@/components/TreeVirtualScroller.vue';
import WaitTypes from '@/enums/wait-types';
import loaderService from '@/services/loader-service';

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
  computed: {
    isVirtualScrollerEnabled(): boolean {
      return this.options.virtualScrolling.useVirtualScrolling;
    },
  },
  watch: {
    roots: {
      immediate: true,
      handler(newRoots: IProcessedTreeNode[]) {
        console.log('flatten start');
        loaderService.start(WaitTypes.FLATTENING_TREE);
        let flatTree: IProcessedTreeNode[] = [];
        if (this.options.virtualScrolling.useVirtualScrolling) {
          newRoots.forEach((root) => {
            flatTree = [...flatTree, ...flattenTree(root, 0, flatTree.length)];
          });
        } else {
          flatTree = newRoots.map((root) => { root.__depth = 0; return root; });
        }

        this.renderedTree = this.getVisibleNodes(flatTree);
        loaderService.end(WaitTypes.FLATTENING_TREE);
        console.log('flatten end');
      },
    },
  },
  methods: {
    async onarrowClick(node: IProcessedTreeNode) {
      const expanded = isExpanded(node);
      if (expanded) {
        await this.handleExpandedNode(node);
      } else {
        await this.handleCollapsedNode(node);
      }

      if (this.isVirtualScrollerEnabled) {
        console.log('expanding begin');
        loaderService.start(WaitTypes.TOGGLING_NODE_STATE);
        this.getNewRenderNodes(node);
        loaderService.end(WaitTypes.TOGGLING_NODE_STATE);
        console.log('expanding end');
      } else {
        // Since mutating nodes directly, we have to manually re-render
        this.$forceUpdate();
      }
    },

    async handleExpandedNode(node: IProcessedTreeNode) {
      node.__state = NodeState.CLOSED;
      node.children = await treeParser.traverseTree([setVisibilityEvaluator], {
        trees: node.children,
        payload: { $_setVisibilityEvaluator: false },
      });
    },

    async handleCollapsedNode(node: IProcessedTreeNode) {
      node.__state = NodeState.OPEN;
      loaderService.start(WaitTypes.TOGGLING_NODE_STATE);
      node.children = await this.options.getChildren(node);
      loaderService.end(WaitTypes.TOGGLING_NODE_STATE);
      console.log(node);
      node.children.forEach((n) => { n.__visible = true; });
    },

    getVisibleNodes(nodes: IProcessedTreeNode[]) {
      return nodes.filter((node) => isNodeVisible(node));
    },

    getNewRenderNodes(node: IProcessedTreeNode) {
      const changingNodes = flattenTree(node, node.__depth, node.__index || 0)
        .filter((n) => n.__visible);

      if (changingNodes[0].__index !== undefined) {
        if (node.__state === NodeState.CLOSED) {
          // + 1 for leaving the root node untouched
          this.renderedTree.splice(changingNodes[0].__index + 1, changingNodes.length - 1);
        } else {
          this.renderedTree.splice(changingNodes[0].__index + 1, 0, ...changingNodes.splice(1));
        }
      }
    },
  },
});
</script>
