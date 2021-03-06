<template>
  <div
    :id="node.id"
    data-test="tree-node"
    class="tree-node transition-border min-h-5 focus:outline-none"
    :class="{
      'border-l border-dashed border-gray-500': options.visual.showFolderBorders && !isRoot,
      'pb-1': isExpanded(node),
    }"
    :style="{
      paddingLeft: !isRoot ? '12px' : '',
      marginLeft: getLeftMargin(node)
    }"
    tabindex="0"
    @keyup.enter.stop="onCurrentNodeArrowClick"
    @click.stop="onCurrentNodeClick"
  >
    <div
      class="tree-node-content py-3 md:py-1 transition-bg leading-tight
            flex flex-auto items-center cursor-pointer "
      :class="{
        'bg-indigo-200': isActive(node)
      }"
    >
      <tree-expand-arrow
        :node="node"
        :options="options"
        @click="onCurrentNodeArrowClick"
      />

      <slot
        name="nodeContent"
        :nodeData="node"
      >
        <slot
          name="nodePrependLabel"
          :nodeData="node"
        />

        <slot
          name="nodeIcon"
          :nodeData="node"
        >
          <tree-node-icon
            class="tree-node-icon"
            :node="node"
            :options="options"
          />
        </slot>

        <slot
          name="nodeLabel"
          :nodeData="node"
        >
          <div class="label">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="node.name || node.id" />
          </div>
        </slot>
      </slot>
    </div>
    <template v-if="isRecursive && isExpanded(node)">
      <tree-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :options="options"
        :is-root="false"
        :active-node-id="activeNodeId"
        data-test="tree-node"
        @arrow-click="onArrowClick"
        @node-click="onNodeClick"
      >
        <template
          v-if="$slots.nodeContent"
          #nodeContent
          :nodeData="node"
        />

        <template
          v-if="!$slots.nodeContent"
        >
          <slot
            name="nodePrependLabel"
            :nodeData="node"
          />
        </template>

        <template
          v-if="!$slots.nodeContent"
        >
          <slot
            name="nodeLabel"
            :nodeData="node"
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
    activeNodeId: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    isRecursive(): boolean {
      return !this.options.virtualScrolling.useVirtualScrolling;
    },
  },
  methods: {
    onCurrentNodeArrowClick(e: Event) {
      e.stopPropagation();
      this.emitTreeEvent('arrow-click', this.node);
      this.$emit('arrow-click', this.node);
    },
    onArrowClick(node: IProcessedTreeNode) {
      this.$emit('arrow-click', node);
    },
    onCurrentNodeClick() {
      this.emitTreeEvent('node-click', this.node);
      this.$emit('node-click', this.node);
    },
    onNodeClick(node: IProcessedTreeNode) {
      this.$emit('node-click', node);
    },
    isExpanded(node: IProcessedTreeNode) {
      return isExpanded(node);
    },
    isActive(node: IProcessedTreeNode) {
      return node.id === this.activeNodeId;
    },
    getLeftMargin(node: IProcessedTreeNode) {
      if (this.isRoot) {
        return '';
      }
      if (node.__depth === 1 || !this.options.virtualScrolling.useVirtualScrolling) {
        return '8px';
      }
      if (node.__depth && node.__depth > 1) {
        const dottedBorder = 7;
        const depthPadding = 24;
        return `${(node.__depth - 1) * depthPadding + dottedBorder}px`;
      }
      return '';
    },
  },
});

export default TreeNode;
</script>
