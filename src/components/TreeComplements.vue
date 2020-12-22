<template>
  <div class="py-3 w-full mr-4 md:flex">
    <pvt-select
      v-model="selectedRoot"
      class="mb-2 md:mr-4 md:mb-0"
      :placeholder="options.i18n.select_root"
      :items="selectOptions"
      data-test="tree-complements-select-root"
      @input="onSelectedRoot"
    />
    <pvt-input
      v-if="options.matchTermEvaluator.enabled"
      :placeholder="options.i18n.term_search"
      data-test="tree-complements-search"
      @change="onSearch"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import PvtSelect, { item } from '@/components/support/PvtSelect.vue';
import PvtInput from '@/components/support/PvtInput.vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import { IFullTreeOptions } from '@/models/tree-options';

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
      type: Object as PropType<IFullTreeOptions>,
      required: true,
    },
  },
  data(): IData {
    return {
      selectedRoot: {
        id: '',
        value: this.options.i18n.show_all,
      },
    };
  },
  computed: {
    selectOptions(): item[] {
      const options: item[] = this.roots.map((root) => ({
        id: root.id,
        value: root.name || root.id.toString(),
      }));

      options.unshift({
        id: '',
        value: this.options.i18n.show_all,
      });

      return options;
    },
  },
  methods: {
    onSearch(term: string) {
      this.$emit('search', term);
    },
    onSelectedRoot(root: item) {
      this.emitTreeEvent('select-root', root.id);
      this.$emit('select-root', root.id);
    },
  },
});
</script>
