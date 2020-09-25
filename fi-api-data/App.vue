<template>
  <div id="app">
    <tree
      :data="treeData"
      :options="options"
      @item-click="onItemClick"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tree from '@/components/Tree.vue';
import ITreeData from '@/models/tree-data';
import ITreeOptions from '@/models/tree-options';
import parseFIData from '~/functions/xml-to-json';
import getDataFrom from '~/services/fetch-fi-data';
import FiApiResponse from '~/models/fi-api-response';
import FiTreeNode from './models/fi-tree-node';
import FiBaseNode, { FiFileNode, FiFolderNode } from './models/fi-node';

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
        trees: [],
      },
    };
  },
  computed: {
    options(): ITreeOptions {
      return {
        isExpandable(node: FiTreeNode) { return node.url !== '' || node.children.length > 0; },
      };
    },
  },
  async created() {
    const parsedData = await this.fetchParsedData('/auth/do/mu');
    this.fiData = parsedData;
    this.treeData.trees = this.parseRootNode(parsedData.uzel[0]);
  },
  methods: {
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

    async onItemClick(item: FiTreeNode) {
      if (item.url) {
        const parsedData = await this.fetchParsedData(item.url);
        // eslint-disable-next-line no-param-reassign
        item.children = this.parseRootNode(parsedData.uzel[0]);
      }
    },
  },
});
</script>
