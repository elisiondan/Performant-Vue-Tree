<template>
  <div
    id="app"
    class="mx-4 my-4"
  >
    <button
      class="bg-blue-700 hover:bg-blue-600 mb-2 mr-2
        text-white py-2 px-4 rounded inline-block"
      @click="expandAll"
    >
      Otevřít vše
    </button>

    <button
      class="bg-blue-700 hover:bg-blue-600 mb-2
        text-white py-2 px-4 rounded inline-block"
      @click="collapseAll"
    >
      Zavřít vše
    </button>

    <tree
      :trees="treeData"
      :options="options"
      class="max-w-sm xxl:max-w-lg tree"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tree from '@/components/Tree.vue';
import ITreeData from '@/models/tree-data';
import ITreeOptions from '@/models/tree-options';
import treeObserver from '@/services/tree-observer';
import parseFIData from '~/functions/xml-to-json';
import getDataFrom from '~/services/fetch-fi-data';
import FiApiResponse from '~/models/fi-api-response';
import FiTreeNode from './models/fi-tree-node';
import FiBaseNode, { FiFileNode, FiFolderNode } from './models/fi-node';
import expandAllEvaluator from '~/services/expand-all-evaluator';
import collapseAllEvaluator from '~/services/collapse-all-evaluator';

interface IData {
  fiData: FiApiResponse | null;
  treeData: ITreeData;
}

type Node = FiFolderNode | FiFileNode;

const isFileNode = (i: Node): i is FiFileNode => Object.prototype.hasOwnProperty.call(i, 'objekty');
const isFolderNode = (i: Node): i is FiFolderNode => !isFileNode(i);

export default Vue.extend({
  name: 'App',
  components: {
    Tree,
  },
  data(): IData {
    return {
      fiData: null,
      treeData: [],
    };
  },
  computed: {
    options(): ITreeOptions {
      const options: ITreeOptions = {
        isExpandable(node: FiTreeNode) { return !!node.url || node.children.length > 0; },
        getChildren: this.onarrowClick,
        nodeEvaluators: [expandAllEvaluator, collapseAllEvaluator],
        virtualScrolling: {
          useVirtualScrolling: true,
          itemSize: 24,
          enableVariableSize: true,
        },
        matchTermEvaluator: {
          enabled: false,
        },
      };

      return options;
    },
  },
  async created() {
    const parsedData = await this.fetchParsedData('/auth/do/mu');
    this.fiData = parsedData;
    this.treeData = this.parseRootNode(parsedData.uzel[0]);
  },
  methods: {
    expandAll() {
      treeObserver.notify({
        expandAll: true,
      });
    },
    collapseAll() {
      treeObserver.notify({
        collapseAll: true,
        rootsId: this.treeData.map((tree) => tree.id),
      });
    },
    parseRootNode(node: FiBaseNode) {
      if (!node.poduzly) {
        return [];
      }

      return node.poduzly[0].poduzel.map((child) => this.parseNode(child));
    },

    getUrlForNode(node: FiFolderNode | FiFileNode) {
      if (isFolderNode(node)) {
        const url = node.cesta;
        return url;
      }
      return '';
    },

    getNodeName(node: Node) {
      if (node.nazev) {
        return node.nazev;
      }

      if (isFileNode(node) && node.objekty.length > 0) {
        return node.objekty[0].objekt[0].jmeno_souboru;
      }

      return '';
    },

    parseNode(node: FiFolderNode | FiFileNode) {
      const treeNode: FiTreeNode = {
        id: node.uzel_id,
        name: this.getNodeName(node),
        children: [],
        url: this.getUrlForNode(node),
        __visible: true,
      };

      return treeNode;
    },

    async fetchParsedData(path: string) {
      const result = await getDataFrom(path);
      const parsedData: FiApiResponse = parseFIData(result.data);
      return parsedData;
    },

    async onarrowClick(item: FiTreeNode) {
      if (item.url && item.children.length === 0) {
        const parsedData = await this.fetchParsedData(item.url);
        // eslint-disable-next-line no-param-reassign
        item.children = this.parseRootNode(parsedData.uzel[0]);
      }
      return item.children;
    },
  },
});
</script>

<style lang="postcss" scoped>
.tree {
    height: calc(100vh - 120px);
}
</style>
