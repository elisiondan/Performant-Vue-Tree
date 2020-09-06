<template>
  <div id="app">
    <tree
      :data="treeData"
      @item-click="onItemClick"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tree from '@/components/Tree.vue';
import ITreeData from '@/models/tree-data';
import parseFIData from '~/functions/xml-to-json';
import getDataFrom from '~/services/fetch-fi-data';
import FiApiResponse from '~/models/fi-api-response';
import FiFolder from './models/fi-folder';
import FiTreeNode from './models/fi-tree-node';
import FiTree from './models/fi-tree';

interface IData {
  treeData: ITreeData;
}

const isManyFolders = (i?: FiFolder | FiFolder[]): i is FiFolder[] => !!i && Array.isArray(i);
// const isSingleFolder = (i?: FiFolder | FiFolder[]): i is FiFolder => !!i && !Array.isArray(i);

export default Vue.extend({
  name: 'App',
  components: {
    Tree,
  },
  data(): IData {
    return {
      treeData: {
        trees: [],
      },
    };
  },
  async created() {
    const parsedData = await this.fetchParsedData('/auth/do/mu');
    this.treeData.trees = this.parseFiDataForTree(parsedData.strom);
  },
  methods: {
    async fetchParsedData(path: string) {
      const result = await getDataFrom(path);
      const parsedData: FiApiResponse = parseFIData(result.data);
      return parsedData;
    },
    parseFiDataForTree(tree: FiTree): FiTreeNode[] {
      if (tree.slozka) {
        if (isManyFolders(tree.slozka.slozka)) {
          return tree.slozka.slozka
            .map((folder: any) => this.parseFolderToNode(folder));
        }
      }
      return [];
    },
    parseFolderToNode(folder: FiFolder) {
      const node: FiTreeNode = {
        obj: { id: folder['@_uzel_id'] },
        children: [],
        url: '',
      };
      if (folder.slozka) {
        if (isManyFolders(folder.slozka)) {
          node.children = folder.slozka.map((child) => this.parseFolderToNode(child));
        } else {
          node.children = [this.parseFolderToNode(folder.slozka)];
        }
      }

      if (folder.obsah_slozky_ignoruji_ctete_metadata) {
        const url = folder.obsah_slozky_ignoruji_ctete_metadata;
        node.url = url
          .substring(url.indexOf('=') + 1, url.indexOf(';') - 1);
      }
      return node;
    },
    async onItemClick(item: FiTreeNode) {
      const parsedData = await this.fetchParsedData(item.url);
      // console.log(parsedData);
      // eslint-disable-next-line no-param-reassign
      item.children = this.parseFiDataForTree(parsedData.strom);
    },
  },
});
</script>
