<template>
  <div class="border-b border-gray-400 pt-2 pb-3 mb-3">
    <pvt-select
      v-model="selectedRoot"
      class="mb-2"
      placeholder="Select root"
      :items="selectOptions"
      @input="onSelectedRoot"
    />
    <pvt-input
      v-if="options.matchTermEvaluator.enabled"
      placeholder="Search tree"
      @input="onSearchInput"
    />
    <!-- <input
      v-if="options.matchTermEvaluator.enabled"
      class="border"
      @input="onSearchInput"
    > -->
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import PvtSelect, { item } from '@/components/support/PvtSelect.vue';
import PvtInput from '@/components/support/PvtInput.vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import ITreeOptions from '@/models/tree-options';
import { debounce } from 'lodash';

interface IData {
    selectedRoot: item;
}

export default Vue.extend({
  name: 'TreeComplements',
  components: {
    PvtSelect,
    PvtInput,
  },
  props: {
    roots: {
      type: Array as PropType<IProcessedTreeNode[]>,
      required: true,
    },
    options: {
      type: Object as PropType<ITreeOptions>,
      required: true,
    },
  },
  data(): IData {
    return {
      selectedRoot: {
        key: '',
        value: 'All roots',
      },
    };
  },
  computed: {
    selectOptions(): item[] {
      const options = this.roots.map((root) => ({
        key: root.obj.id,
        value: root.obj.name || root.obj.id.toString(),
      }));

      options.unshift({
        key: '',
        value: 'All roots',
      });

      return options;
    },
  },
  methods: {
    onSearchInput: debounce(
      function onSearch(this: Vue, event: any) {
        this.$emit('search', event.target.value);
      },
      100,
    ),
    onSelectedRoot(root: item) {
      this.$emit('select-root', root.key);
    },
  },
});
</script>

<style scoped>

</style>
