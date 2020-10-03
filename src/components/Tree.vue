<template>
  <div>
    <input
      v-if="treeOptions.matchTermEvaluator.enabled"
      class="border"
      @input="onSearchInput"
    >
    <tree-root
      v-for="root in traversedTrees"
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
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue';
import ITreeData from '@/models/tree-data';
import ITreeOptions, { IFullTreeOptions, defaultOptions } from '@/models/tree-options';

import TreeRoot from '@/components/TreeRoot.vue';

import treeObserver from '@/services/tree-observer';
import { debounce, cloneDeep } from 'lodash';
import WorkerService from '@/services/worker-service';
import { IItraversalOutput, ITraversalInput } from '@/workers/tree-traversal-worker';

import JSONfn from 'json-fn';
import { IProcessedTreeNode } from '@/models/tree-node';
import MatchTermEvaluator from '@/services/node-evaluators/match-term-evaluator';

const treeTraversalWorker = new WorkerService(
  new Worker('@/workers/tree-traversal-worker.ts', { type: 'module' }),
);

let fullTree: IProcessedTreeNode[] = [];

interface IData {
    search: '';
    traversedTrees: readonly IProcessedTreeNode[];
}

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
  data(): IData {
    return {
      search: '',
      traversedTrees: [],
    };
  },
  computed: {
    treeOptions(): IFullTreeOptions {
      const options = {
        ...defaultOptions,
        ...this.options,
      };

      console.log(options);
      if (options.matchTermEvaluator.enabled) {
        options.nodeEvaluators.push(MatchTermEvaluator);
      }

      return options;
    },
  },
  watch: {
    data: {
      handler(treeData: ITreeData) {
        fullTree = cloneDeep(treeData.trees);
        this.traversedTrees = Object.freeze(cloneDeep(treeData.trees));
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    treeObserver.subscribe('performant-tree-traversal', this.traverseTree);
  },
  methods: {
    onSearchInput: debounce(
      (event: any) => {
        treeObserver.notify({
          searchTerm: event.target.value,
          removeUnmatched: false,
        //   filterOptions: {
        //     filters: [(node: IProcessedTreeNode) => node.obj.name === 'Koronavirus 2020'],
        //   },
        });
      }, 100,
    ),
    async traverseTree(payload: any) {
      if (payload.filterOptions && payload.filterOptions.filters) {
        // eslint-disable-next-line no-param-reassign
        payload.filterOptions.filters = payload.filterOptions.filters
          .map((o: any) => JSONfn.stringify(o));
      }

      const result = await treeTraversalWorker.postMessage<IItraversalOutput<IProcessedTreeNode>>({
        trees: fullTree,
        nodeEvaluators: this.treeOptions.nodeEvaluators.map((e) => JSONfn.stringify(e)),
        nodeEvaluatorsData: payload,
      } as ITraversalInput);

      this.traversedTrees = Object.freeze(result.trees);
    },
  },
});
</script>
