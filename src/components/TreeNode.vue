<template>
  <div
    class="transition-border min-h-5"
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
        <span v-html="node.name || node.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import TreeExpandArrow from '@/components/TreeExpandArrow.vue';
import TreeFolderIcon from '@/components/TreeFolderIcon.vue';
import { IFullTreeOptions } from '@/models/tree-options';

interface IData {
    nodesToRender: IProcessedTreeNode[];
}

export default Vue.extend({
  name: 'TreeNode',
  components: {
    TreeExpandArrow,
    TreeFolderIcon,
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
  methods: {
    async onArrowClick() {
      this.$emit('arrow-click', this.node);
    },
  },
});
</script>
