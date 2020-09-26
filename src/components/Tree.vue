<template>
  <div>
    <input
      v-if="treeOptions.searchEvaluator.enabled"
      class="border"
      @input="onSearchInput"
    >
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
import treeObserver from '@/services/tree-observer';
import { debounce } from 'lodash';

const defaultOptions: IFullTreeOptions = {
  isExpandable: isExpandableNode,
  nodeEvaluators: [MatchTermEvaluator],
  searchEvaluator: {
    enabled: true,
    highlightClass: 'bg-yellow-400',
    debounceDelay: 100,
  },
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
      default: () => defaultOptions,
    },
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    treeOptions(): IFullTreeOptions {
      return {
        ...defaultOptions,
        ...this.options,
      };
    },
  },
  methods: {
    onSearchInput: debounce(
      (event: any) => {
        treeObserver.notify({
          searchTerm: event.target.value,
          removeUnmatched: true,
        });
      }, 100,
    ),
  },
});
</script>
