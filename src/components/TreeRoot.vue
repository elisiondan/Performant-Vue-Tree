<template>
  <div v-if="root.__visible && !root.__filtered">
    <tree-node
      v-for="n in renderedTree"
      :key="n.obj.id"
      :node="n"
      :options="options"
      :is-root="n.obj.id === root.obj.id"
      :depth="n.__depth"
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

<script lang='ts'>
/* eslint-disable no-param-reassign */
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

interface IData {
    // traversedRoot: IProcessedTreeNode;
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
//   const output: IProcessedTreeNode[] = [];

  return nodes.filter((n) => n.__visible && !n.__filtered);

  //   if (node.__visible && !node.__filtered) {
  //     nodes.push(node);

//     const shouldRenderChildren = NodeState.OPEN === node.__state && isExpandableNode(node);
//     if (shouldRenderChildren) {
//       node.children.forEach((n) => {
//         getRenderNodes(n, nodes);
//       });
//     }
//   }
//   return nodes;
}

// const allNodes = new Map<number | string, IProcessedTreeNode>();

let flattenTree: IProcessedTreeNode[] = [];

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
  data(): IData {
    return {
      renderedTree: [],
    };
  },
  watch: {
    root: {
      immediate: true,
      handler(newVal: IProcessedTreeNode) {
        flattenTree = flatten(newVal);
        this.renderedTree = getRenderNodes(flattenTree);
      },
    },
  },
  //   computed: {
  //     flattenTree(): IProcessedTreeNode[] {
  //       return flatten(this.root, 0, []);
  //     },
  //   },
  methods: {
    async onarrowClick(node: IProcessedTreeNode) {
    //   const newNode = cloneDeep(node);
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
          if (n.obj.id !== node.obj.id) {
            updatedNodes.push(n);
          } else {
            updatedNodes = [...updatedNodes, ...getRenderNodes(changingNodes)];
          }
        });
      }

      if (node.__state === NodeState.CLOSED) {
        updatedNodes = arrayDifference(this.renderedTree, 'obj.id', changingNodes.slice(1), 'obj.id');
      }

      //   const a = arrayDifference(this.renderedTree)

      this.renderedTree = updatedNodes;

      //   flattenTree.forEach((n) => {
      //     if (n.obj.id !== newNode.obj.id) {
      //       updatedNodes.push(n);
      //     } else {
      //       updatedNodes = [...updatedNodes];
      //     }
      //   });

      //   this.renderedTree = updatedNodes;

      //   console.log(node);

    //   this.$emit('arrow-click', node);
    //   this.$forceUpdate();
    },
  },
});
</script>
