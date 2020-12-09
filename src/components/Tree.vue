<template>
  <pvt-vertical-accordion
    ref="wrapper"
    v-model="collapsed"
    :title="accordionTitle"
    class="tree h-full mx-2 overflow-y-auto"
  >
    <template
      v-if="isWaitingForTreeProcessess"
      #expandedBeforeContent
    >
      <slot name="loading">
        <loading-indicator />
      </slot>
    </template>

    <template #expandedBeforeChevron>
      <tree-complements
        ref="complements"
        :roots="roots"
        :options="treeOptions"
        @search="onSearch"
        @select-root="onSelectRoot"
      />
    </template>

    <tree-wrapper
      :tree-height="treeHeight"
      :roots="renderedTrees"
      :options="treeOptions"
    >
      <template #nodeContent="nodeData">
        <slot
          name="nodeContent"
          :data="nodeData"
        />
      </template>

      <template #nodePrependLabel="nodeData">
        <slot
          name="nodePrependLabel"
          :data="nodeData"
        />
      </template>

      <template #nodeLabel="nodeData">
        <slot
          name="nodeLabel"
          :data="nodeData"
        />
      </template>
    </tree-wrapper>
  </pvt-vertical-accordion>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue';
import ITreeData from '@/models/tree-data';
import ITreeOptions, { IFullTreeOptions } from '@/models/tree-options';
import defaultOptions from '@/defaults/default-tree-options';
import PvtVerticalAccordion from '@/components/support/PvtVerticalAccordion.vue';

import TreeWrapper from '@/components/TreeWrapper.vue';
import TreeComplements from '@/components/TreeComplements.vue';

import treeObserver from '@/services/tree-observer';
import { cloneDeep, merge } from 'lodash';

import { IProcessedTreeNode } from '@/models/tree-node';
import MatchTermEvaluator from '@/services/node-evaluators/match-term-evaluator';
import treeParser from '@/services/tree-parser';
import WaitTypes from '@/enums/wait-types';
import loaderService from '@/services/loader-service';
import LoadingIndicator from '@/components/support/LoadingIndicator.vue';
import '@/assets/css/main.css';

let fullTree: IProcessedTreeNode[] = [];

interface IData {
    search: '';
    traversedTrees: IProcessedTreeNode[];
    selectedRootId: string | number;
    selectedRoot: IProcessedTreeNode | undefined;
    collapsed: boolean;
    treeHeight: string;
}

export default Vue.extend({
  name: 'Tree',
  components: {
    TreeWrapper,
    TreeComplements,
    PvtVerticalAccordion,
    LoadingIndicator,
  },
  props: {
    trees: {
      type: Array as PropType<ITreeData>,
      required: true,
    },
    options: {
      type: Object as PropType<ITreeOptions>,
      default: () => defaultOptions,
    },
  },
  provide() {
    return {
      emitTreeEvent: (name: string, args?: unknown) => this.$emit(name, args),
    };
  },
  data(): IData {
    return {
      search: '',
      traversedTrees: [],
      selectedRootId: '',
      selectedRoot: undefined,
      collapsed: false,
      treeHeight: '0px',
    };
  },
  computed: {
    isWaitingForTreeProcessess(): boolean {
      return loaderService.is([
        WaitTypes.TRAVERSING_TREE,
        WaitTypes.FLATTENING_TREE,
        WaitTypes.TOGGLING_NODE_STATE,
      ]);
    },
    treeOptions(): IFullTreeOptions {
      const options: IFullTreeOptions = merge(defaultOptions, this.options);

      if (options.matchTermEvaluator.enabled) {
        options.nodeEvaluators.push(MatchTermEvaluator);
      }

      return options;
    },
    roots(): IProcessedTreeNode[] {
      return this.trees.map((root) => ({
        ...root,
        children: [],
      }));
    },
    renderedTrees(): IProcessedTreeNode[] {
      if (this.selectedRootId !== '') {
        return this.traversedTrees.filter((root) => root.id === this.selectedRootId);
      }
      return this.traversedTrees;
    },
    accordionTitle(): string {
      return this.selectedRoot
        ? this.selectedRoot.name || this.selectedRoot.id.toString()
        : '';
    },

  },
  watch: {
    trees: {
      handler(treeData: ITreeData) {
        fullTree = cloneDeep(treeData);
        fullTree.forEach((root) => { root.__visible = true; });
        this.traversedTrees = cloneDeep(fullTree);
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    treeObserver.subscribe('performant-tree-traversal', this.traverseTreeAndReplace);
  },
  async mounted() {
    this.treeHeight = await this.getTreeHeight();
    window.addEventListener('resize', async () => {
      this.treeHeight = await this.getTreeHeight();
    });
  },
  methods: {
    onSelectRoot(id: string | number) {
      this.selectedRootId = id;
      this.selectedRoot = this.trees
        .find((root) => root.id === this.selectedRootId);
    },
    onSearch(term: string) {
      treeObserver.notify({
        searchTerm: term,
        removeUnmatched: true,
        trees: fullTree,
      });
    },

    async traverseTreeAndReplace(payload: any) {
      const { nodeEvaluators } = this.treeOptions;
      const currentTrees = payload?.trees || this.traversedTrees;

      console.log('traversal start');
      loaderService.start(WaitTypes.TRAVERSING_TREE);
      const newTrees = await treeParser.traverseTree(
        nodeEvaluators,
        { trees: currentTrees, payload },
      );
      loaderService.end(WaitTypes.TRAVERSING_TREE);

      console.log('traversal end');

      this.traversedTrees = newTrees;
    },
    async getTreeHeight() {
      await this.$nextTick();
      if (!this.options.virtualScrolling?.useVirtualScrolling) {
        return '100%';
      }

      if (this.$refs.wrapper && this.$refs.complements) {
        const wrapper = (this.$refs.wrapper as Vue).$el;
        const complements = (this.$refs.complements as Vue).$el;
        return `${wrapper.clientHeight - complements.clientHeight}px`;
      }
      return '0px';
    },
  },
});
</script>
