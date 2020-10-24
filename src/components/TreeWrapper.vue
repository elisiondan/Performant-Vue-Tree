<template>
  <div v-if="root.__visible && !root.__filtered">
    <tree-virtual-scroller
      v-if="renderedTree.length > 0"
      class="flex-1"
      :items="renderedTree"
      key-field="id"
      :item-size="32"
    >
      <template #default="{item}">
        <tree-node
          :node="item"
          :options="options"
          :is-root="item.obj.id === root.obj.id"
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
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import TreeNode from '@/components/TreeNod.vue';
import { IFullTreeOptions } from '@/models/tree-options';

import isExpanded from '@/functions/is-expanded';
import NodeState from '@/enums/node-state';
import setVisibilityEvaluator from '@/services/node-evaluators/set-visibility-evaluator';
import treeParser from '@/services/tree-parser';
import isExpandableNode from '@/functions/is-expandable-node';
import { cloneDeep } from 'lodash';
import arrayDifference from '@/functions/array-difference';
import TreeVirtualScroller from '@/components/TreeVirtualScroller.vue';

interface IData {
    renderedTree: IProcessedTreeNode[];
}

function flatten(node: IProcessedTreeNode, depth = 0, nodes: IProcessedTreeNode[] = []) {
  nodes.push({
    ...node,
    __depth: depth,
  });

  node.children.forEach((n) => {
    flatten(n, depth + 1, nodes);
  });
  return nodes;
}

function getRenderNodes(nodes: IProcessedTreeNode[]) {
  return nodes.filter((n) => n.__visible && !n.__filtered);
}

let flattenTree: IProcessedTreeNode[] = [];

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
        flattenTree = [];
        newRoots.forEach((root) => {
          flattenTree = [...flattenTree, ...flatten(root)];
        });
        console.log('flattenTree');

        // this.renderedTree = getRenderNodes(flattenTree);
        this.renderedTree = flattenTree;
      },
    },
  },
  created() {
    flattenTree = [];
    this.roots.forEach((root) => {
      flattenTree = [...flattenTree, ...flatten(root)];
    });
    console.log('flattenTree');

    // this.renderedTree = getRenderNodes(flattenTree);
    this.renderedTree = flattenTree;
  },
  methods: {
    async onarrowClick(node: IProcessedTreeNode) {
      const expanded = isExpanded(node);
      if (expanded) {
        node.__state = NodeState.CLOSED;
        node.children = await treeParser.traverseTree([setVisibilityEvaluator], {
          trees: node.children,
          payload: { $_setVisibilityEvaluator: false },
        });
      } else {
        node.__state = NodeState.OPEN;
        node.children.forEach((n) => { n.__visible = true; });
      }

      let updatedNodes: IProcessedTreeNode[] = [];
      const changingNodes = flatten(node, node.__depth);

      if (node.__state === NodeState.OPEN) {
        this.renderedTree.forEach((n) => {
          if (n.id !== node.id) {
            updatedNodes.push(n);
          } else {
            updatedNodes = [...updatedNodes, ...getRenderNodes(changingNodes)];
          }
        });
      }

      if (node.__state === NodeState.CLOSED) {
        const childrenNodes = changingNodes.slice(1);
        updatedNodes = arrayDifference(this.renderedTree, 'id', childrenNodes, 'id');
      }

    //   this.renderedTree = updatedNodes;
    },
  },
});
</script>

<style scoped>

</style>
