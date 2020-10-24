<template>
  <div
    class="transition-border"
    :class="{
      'border-l border-dashed border-gray-500': options.visual.showFolderBorders && !isRoot
    }"
    :style="{paddingLeft: `${0.5 * depth}rem`, marginLeft: `${0.5 * depth}rem`}"
  >
    <div class="mt-1 transition-bg leading-tight flex flex-auto items-center cursor-pointer ">
      <tree-expand-arrow
        :node="node"
        :options="options"
        @click="onArrowClick"
      />

      <slot
        name="prependLabel"
        :node="node"
      />

      <tree-folder-icon
        :node="node"
        :options="options"
      />

      <div class="label">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="node.obj.name || node.obj.id" />
      </div>
    </div>

    <!-- <tree-virtual-scroller
      v-if="nodesToRender.length > 0"
      :items="nodesToRender"
      :item-size="32"
    >
      <template #default="{item}">
        {{ item }}
      </template>
    </tree-virtual-scroller> -->
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import getNodesToRender from '@/components/TreeNode/get-nodes-to-render';
import TreeExpandArrow from '@/components/TreeExpandArrow.vue';
import TreeFolderIcon from '@/components/TreeFolderIcon.vue';
import { IFullTreeOptions } from '@/models/tree-options';
import evaluateNodeState from '@/functions/evaluate-node-state';
// import TreeVirtualScroller from '@/components/TreeVirtualScroller.vue';

import isExpanded from '@/functions/is-expanded';
import NodeState from '@/enums/node-state';
import setVisibilityEvaluator from '@/services/node-evaluators/set-visibility-evaluator';
import treeParser from '@/services/tree-parser';

interface IData {
    nodesToRender: IProcessedTreeNode[];
}

export default Vue.extend({
  name: 'TreeNod',
  components: {
    TreeExpandArrow,
    TreeFolderIcon,
    // TreeVirtualScroller,
  },
  props: {
    node: {
      type: Object as PropType<IProcessedTreeNode>,
      required: true,
    },
    options: {
      type: Object as PropType<IFullTreeOptions>,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    depth: {
      type: Number,
      required: true,
    },
  },
  //   data(): IData {
  //     return {
  //       nodesToRender: [],
  //     };
  //   },
  //   created() {
  //     this.node.__state = evaluateNodeState(this.node);
  //     this.nodesToRender = getNodesToRender({
  //       node: this.node,
  //       isRoot: this.isRoot,
  //     });
  //   },
  //   updated() {
  //     console.log('updated');
  //     this.nodesToRender = getNodesToRender({
  //       node: this.node,
  //       isRoot: this.isRoot,
  //     });
  //   },
  methods: {
    async onArrowClick() {
      this.$emit('arrow-click', this.node);
      //   const { node } = this;

      //   const expanded = isExpanded(node);
      //   if (expanded) {
      //     node.__state = NodeState.CLOSED;
      //   } else {
      //     node.__state = NodeState.OPEN;
      //   }

      //   node.children = await treeParser.traverseTree([setVisibilityEvaluator], {
      //     trees: node.children,
      //     payload: { $_setVisibilityEvaluator: !expanded },
      //   });

    //   this.$forceUpdate();
    },
  },
});
</script>

<style scoped>

</style>
