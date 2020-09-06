<template>
  <div id="app">
    <tree :data="treeData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tree from '@/components/Tree.vue';
import ITreeData from '@/models/tree-data';
import parseFIData from '~/functions/parse-fi-data';
import getDataFrom from '~/services/fetch-fi-data';

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
    const parsedData = parseFIData(result.data);
    console.log(parsedData);
  },
});
</script>
