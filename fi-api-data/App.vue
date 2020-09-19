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
import FiFolder from './models/fi-folder';
import FiTreeNode from './models/fi-tree-node';
import FiTree from './models/fi-tree';
import FiNode, { FiNodeWrapper } from './models/fi-node';
import FiNodeBase from './models/fi-node-base';

interface IData {
  fiData: FiApiResponse | null;
  treeData: ITreeData;
  folderToNode: Map<FiFolder, FiNodeBase>;
}

const isManyFolders = (i?: FiFolder | FiFolder[]): i is FiFolder[] => !!i && Array.isArray(i);
const isSingleFolder = (i?: FiFolder | FiFolder[]): i is FiFolder => !!i && !Array.isArray(i);

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
      folderToNode: new Map<FiFolder, FiNodeBase>(),
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
    // this.treeData.trees =
    // [this.parseFiDataForTree(parsedData.strom.slozka, parsedData.uzly.uzel)];
    this.treeData.trees = this.parseTrees(parsedData.strom, parsedData.uzly);
  },
  methods: {
    parseTrees(trees: FiTree[], nodes: FiNodeWrapper[]) {
      return trees.map((tree) => this.parseTreeFolders(tree.slozka, nodes))[0];
    },

    parseTreeFolders(folders: FiFolder[], nodes: FiNodeWrapper[]) {
      return folders.map((folderNode) => this.parseFolderNode(folderNode, nodes));
    },

    parseFolderNode(folderNode: FiFolder, nodes: FiNodeWrapper[]) {
      const mappedNode = this.getNodeForFolder(folderNode, nodes);

      const treeNode: FiTreeNode = {
        obj: {
          id: folderNode['@_uzel_id'],
          name: mappedNode ? mappedNode.nazev : folderNode['@_url'],
        },
        children: [],
        url: '',
      };

      if (folderNode.slozka) {
        if (isManyFolders(folderNode.slozka)) {
          treeNode.children = folderNode.slozka
            .map((child) => this.parseFolderNode(child, nodes));
        }

        if (isSingleFolder(folderNode.slozka)) {
          treeNode.children = [this.parseFolderNode(folderNode.slozka, nodes)];
        }
      }

      if (folderNode.obsah_slozky_ignoruji_ctete_metadata) {
        const url = folderNode.obsah_slozky_ignoruji_ctete_metadata;
        treeNode.url = url
          .substring(url.indexOf('=') + 1, url.indexOf(';') - 1);
      }

      return treeNode;
    },

    async fetchParsedData(path: string) {
      const result = await getDataFrom(path);
      const parsedData: FiApiResponse = parseFIData(result.data);
      return parsedData;
    },

    getNodeForFolder(folder: FiFolder, nodeWrappers: FiNodeWrapper[]) {
      let candidates = [folder];
      if (folder.slozka) {
        candidates = [...candidates, ...folder.slozka];
      }

      let mappedNode;
      let i = 0;

      while (!mappedNode && i < candidates.length) {
        mappedNode = this.mapFolderToNode(candidates[i], nodeWrappers);
        if (mappedNode === undefined) {
          // console.log(folder);
          // console.log(candidates);
          // console.log(nodeWrappers);
          // console.log('----------------');
        }
        i += 1;
      }

      return mappedNode;
    },

    mapFolderToNode(folder: FiFolder, nodeWrappers: FiNodeWrapper[]) {
      nodeWrappers.forEach((nodeWrapper) => {
        const baseNodes = nodeWrapper.uzel;

        baseNodes.forEach((baseNode) => {
          if (folder['@_uzel_id'] === baseNode.uzel_id) {
            this.folderToNode.set(folder, baseNode);
          } else {
            baseNode.poduzly.forEach((subnodeWrapper) => {
              const subnodes = subnodeWrapper.poduzel;

              subnodes.forEach((subnode) => {
                if (subnode.uzel_id === folder['@_uzel_id']) {
                  this.folderToNode.set(folder, subnode);
                }
              });
            });
          }
        });
      });

      return this.folderToNode.get(folder);
    },

    async onItemClick(item: FiTreeNode) {
      if (item.url) {
        const parsedData = await this.fetchParsedData(item.url);
        // eslint-disable-next-line no-param-reassign
        item.children = this.parseTrees(parsedData.strom, parsedData.uzly);
      }
    },
  },
});
</script>
