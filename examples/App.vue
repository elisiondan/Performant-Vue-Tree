<template>
  <div id="app">
    <tree :data="treeData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tree from '@/components/Tree.vue';
import ITreeData from '@/models/tree-data';
import getDataFrom from './api';

interface IData {
  treeData: ITreeData;
}

export default Vue.extend({
  name: 'App',
  components: {
    Tree,
  },
  data(): IData {
    return {
      treeData: {
        trees: [
          {
            obj: {
              id: 1,
            },
            children: [],
          },
        ],
      },
    };
  },
  async created() {
    const result = await getDataFrom('/auth/do/mu');
    console.log(result);
  },
});
</script>
