<template>
  <div
    :id="node.id"
    class="transition-border min-h-5 focus:outline-none"
    :class="{
      'border-l border-dashed border-gray-500': options.visual.showFolderBorders && !isRoot,
      'pb-1': isExpanded(node)
    }"
    :style="{paddingLeft: !isRoot ? '75rem' : '', marginLeft: !isRoot ? '.5rem' : ''}"
    tabindex="0"
    @keyup.enter="onArrowClick"
  >
    <div
      class="py-3 md:py-1 transition-bg leading-tight
            flex flex-auto items-center cursor-pointer"
    >
      <tree-expand-arrow
        :node="node"
        :options="options"
        @click="onArrowClick"
      />

      <slot name="nodeContent">
        <slot
          name="nodePrependLabel"
          :node="node"
        />

        <tree-node-icon
          :node="node"
          :options="options"
        />

        <slot name="nodeLabel">
          <div class="label">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="node.name || node.id" />
          </div>
        </slot>
      </slot>
    </div>
    <!-- {{ isExpanded(node) }} {{ node.__state === 'open' }} -->
    <template v-if="isRecursive && isExpanded(node)">
      <tree-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :options="options"
        :is-root="false"
        :depth="depth + 1"
        @arrow-click="onArrowClick"
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
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import TreeExpandArrow from '@/components/TreeExpandArrow.vue';
import TreeNodeIcon from '@/components/TreeNodeIcon.vue';
import { IFullTreeOptions } from '@/models/tree-options';
import isExpanded from '@/functions/tree/is-expanded';

interface IData {
    nodesToRender: IProcessedTreeNode[];
}

const TreeNode = Vue.extend({
  name: 'TreeNode',
  inject: ['emitTreeEvent'],
  components: {
    TreeExpandArrow,
    TreeNodeIcon,
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
  computed: {
    isRecursive(): boolean {
      return !this.options.virtualScrolling.useVirtualScrolling;
    },
  },
  methods: {
    onArrowClick(node?: IProcessedTreeNode) {
      this.emitTreeEvent('arrow-click', node || this.node);
      this.$emit('arrow-click', node || this.node);
    },
    isExpanded(node: IProcessedTreeNode) {
      return isExpanded(node);
    },
  },
});

export default TreeNode;
</script>
