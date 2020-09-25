<template>
  <div>
    <tree-root
      v-for="root in data.trees"
      :key="root.id"
      :root="root"
      :options="treeOptions"
      @item-click="($event) => $emit('item-click', $event)"
    >
      <template #prependLabel="nodeData">
        <slot
          name="prependLabel"
          :data="nodeData"
        />
      </template>

      <template #appendLabel="nodeData">
        <slot
          name="appendLabel"
          :data="nodeData"
        />
      </template>
    </tree-root>
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue';
import ITreeData from '@/models/tree-data';
import ITreeOptions, { IFullTreeOptions } from '@/models/tree-options';

import TreeRoot from '@/components/TreeRoot.vue';
import isExpandableNode from '@/functions/is-expandable-node';
import MatchTermEvaluator from '@/services/node-evaluators/match-term-evaluator';

const defaultOptions: IFullTreeOptions = {
  isExpandable: isExpandableNode,
  nodeEvaluators: [MatchTermEvaluator],
  visual: {
    showIconForFolders: true,
    showFolderBorders: true,
  },
};

export default Vue.extend({
  name: 'Tree',
  components: {
    TreeRoot,
  },
  props: {
    data: {
      type: Object as PropType<ITreeData>,
      required: true,
    },
    options: {
      type: Object as PropType<ITreeOptions>,
      default: () => ({}),
    },
  },
  computed: {
    treeOptions(): any {
      return {
        ...defaultOptions,
        ...this.options,
      };
    },
  },
});
</script>
