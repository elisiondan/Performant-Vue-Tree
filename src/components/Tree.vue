<template>
  <pvt-vertical-accordion
    v-model="collapsed"
    :title="accordionTitle"
    class="tree mx-2"
  >
    <template #expandedBeforeChevron>
      <tree-complements
        :roots="roots"
        :options="treeOptions"
        class="max-w-md"
        @search="onSearch"
        @select-root="onSelectRoot"
      />
    </template>

    <tree-virtual-scroller
      :nodes="renderedTrees"
    >
      <tree-root
        v-for="root in renderedTrees"
        :key="root.id"
        :root="root"
        :options="treeOptions"
        @arrow-click="($event) => $emit('arrow-click', $event)"
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
    </tree-virtual-scroller>
  </pvt-vertical-accordion>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue';
import ITreeData from '@/models/tree-data';
import ITreeOptions, { IFullTreeOptions, defaultOptions } from '@/models/tree-options';
import PvtVerticalAccordion from '@/components/support/PvtVerticalAccordion.vue';

import TreeRoot from '@/components/TreeRoot.vue';
import TreeVirtualScroller from '@/components/TreeVirtualScroller.vue';
import TreeComplements from '@/components/TreeComplements.vue';

import treeObserver from '@/services/tree-observer';
import { cloneDeep } from 'lodash';
// import WorkerService from '@/services/worker-service';
// import { IItraversalOutput, ITraversalInput } from '@/workers/tree-traversal-worker';

import JSONfn from 'json-fn';
import { IProcessedTreeNode } from '@/models/tree-node';
import MatchTermEvaluator from '@/services/node-evaluators/match-term-evaluator';
// import { INodeEvaluator } from '@/services/tree-traversal-service';
import treeParser from '@/services/tree-parser';

// const treeTraversalWorker = new WorkerService(
//   new Worker('@/workers/tree-traversal-worker.ts', { type: 'module' }),
// );

let fullTree: IProcessedTreeNode[] = [];

interface IData {
    search: '';
    traversedTrees: IProcessedTreeNode[];
    selectedRootId: string | number;
    selectedRoot: IProcessedTreeNode | undefined;
    collapsed: boolean;
}

export default Vue.extend({
  name: 'Tree',
  components: {
    TreeRoot,
    TreeComplements,
    PvtVerticalAccordion,
    TreeVirtualScroller,
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
  data(): IData {
    return {
      search: '',
      traversedTrees: [],
      selectedRootId: '',
      selectedRoot: undefined,
      collapsed: false,
    };
  },
  computed: {
    treeOptions(): IFullTreeOptions {
      const options = {
        ...defaultOptions,
        ...this.options,
      };

      if (options.matchTermEvaluator.enabled) {
        options.nodeEvaluators.push(MatchTermEvaluator);
      }

      return options;
    },
    roots(): IProcessedTreeNode[] {
      return this.data.trees.map((root) => ({
        ...root,
        children: [],
      }));
    },
    renderedTrees(): IProcessedTreeNode[] {
      if (this.selectedRootId !== '') {
        return this.traversedTrees.filter((root) => root.obj.id === this.selectedRootId);
      }
      return this.traversedTrees;
    },
    accordionTitle(): string {
      return this.selectedRoot
        ? this.selectedRoot.obj.name || this.selectedRoot.obj.id.toString()
        : '';
    },
  },
  watch: {
    data: {
      handler(treeData: ITreeData) {
        fullTree = cloneDeep(treeData.trees);
        fullTree.forEach((root) => { root.__visible = true; });
        this.traversedTrees = cloneDeep(fullTree);
        treeParser.setFullTree(fullTree);
        treeParser.setCurrentTree(this.traversedTrees);
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    treeObserver.subscribe('performant-tree-traversal', this.traverseTreeAndReplace);
  },
  methods: {
    onSelectRoot(id: string | number) {
      this.selectedRootId = id;
      this.selectedRoot = this.data.trees
        .find((root) => root.obj.id === this.selectedRootId);
    },
    onSearch(term: string) {
      treeObserver.notify({
        searchTerm: term,
        removeUnmatched: true,
        //   filterOptions: {
        //     filters: [(node: IProcessedTreeNode) => node.obj.name === 'Koronavirus 2020'],
        //   },
      });
    },

    async traverseTreeAndReplace(payload: any) {
      if (payload.filterOptions && payload.filterOptions.filters) {
        // eslint-disable-next-line no-param-reassign
        payload.filterOptions.filters = payload.filterOptions.filters
          .map((o: any) => JSONfn.stringify(o));
      }

      const { nodeEvaluators } = this.treeOptions;

      const trees = await treeParser.traverseTree(nodeEvaluators, { payload });

      this.traversedTrees = trees;
      this.traversedTrees.forEach((root) => { root.__visible = true; });
      treeParser.setCurrentTree(this.traversedTrees);
    },
  },
});
</script>
