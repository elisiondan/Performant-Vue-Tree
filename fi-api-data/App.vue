<template>
  <div
    id="app"
    class="mx-2"
  >
    <button
      class="bg-blue-700 hover:bg-blue-600 mb-2
        text-white font-bold py-2 px-4 rounded inline-block"
      @click="expandAll"
    >
      Expand all
    </button>

    <button
      class="bg-blue-700 hover:bg-blue-600 mb-2
        text-white font-bold py-2 px-4 rounded inline-block"
      @click="collapseAll"
    >
      Collapse all
    </button>

    <tree
      :data="treeData"
      :options="options"
      class="max-w-sm"
      @arrow-click="onarrowClick"
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
import trees from './fixtures/trees';
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
      treeData: {
        trees,
      },
    };
  },
  computed: {
    options(): ITreeOptions {
      return {
        isExpandable(node: FiTreeNode) { return node.url !== '' || node.children.length > 0; },
        nodeEvaluators: [expandAllEvaluator, collapseAllEvaluator],
      };
    },
  },
  async created() {
    const parsedData = await this.fetchParsedData('/auth/do/mu');
    this.fiData = parsedData;
    // this.treeData.trees = this.parseRootNode(parsedData.uzel[0]);
    this.treeData.trees = trees;
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
        obj: {
          id: node.uzel_id,
          name: this.getNodeName(node),
        },
        children: [],
        url: this.getUrlForNode(node),
      };

      //   if (isBaseNode(node)) {
      //     treeNode.children = node.poduzly[0].poduzel.map((child) => this.parseNode(child));
      //   }

      //   if (isSubNode(node)) {
      //     treeNode.children = node.poduzly.map((child) => this.parseNode(child.poduzel[0]));
      //   }

      return treeNode;
    },

    async fetchParsedData(path: string) {
      const result = await getDataFrom(path);
      const parsedData: FiApiResponse = parseFIData(result.data);
      return parsedData;
    },

    async onarrowClick(item: FiTreeNode) {
      if (item.url) {
        // const parsedData = await this.fetchParsedData(item.url);
        // eslint-disable-next-line no-param-reassign
        // item.children = this.parseRootNode(parsedData.uzel[0]);
      }
    },
  },
});
</script>
