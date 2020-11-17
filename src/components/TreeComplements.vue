<template>
  <div class="border-b border-gray-400 py-3">
    <pvt-select
      v-model="selectedRoot"
      class="mb-2"
      placeholder="Select root"
      :items="selectOptions"
      @input="onSelectedRoot"
    />
    <pvt-input
      v-if="options.matchTermEvaluator.enabled"
      placeholder="Vyhledat"
      @input="onSearchInput"
    />
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
  inject: ['emitTreeEvent'],
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
        id: '',
        value: 'Zobrazit vše',
      },
    };
  },
  computed: {
    selectOptions(): item[] {
      const options = this.roots.map((root) => ({
        id: root.id,
        value: root.name || root.id.toString(),
      }));

      options.unshift({
        id: '',
        value: 'Zobrazit vše',
      });

      return options;
    },
  },
  methods: {
    onSearchInput: debounce(
      function onSearch(this: Vue, term: string) {
        this.$emit('search', term);
      },
      150,
    ),
    onSelectedRoot(root: item) {
      this.emitTreeEvent('select-root', root.id);
      this.$emit('select-root', root.id);
    },
  },
});
</script>
