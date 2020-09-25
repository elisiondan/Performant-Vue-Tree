<script lang="tsx">
import Vue from 'vue';
import ClarityIcon from '@/components/ClarityIcon.vue';
import { Prop } from 'vue/types/options.d';
import { IFullTreeOptions } from '@/models/tree-options';
import { IProcessedTreeNode } from '@/models/tree-node';

export default Vue.extend({
  name: 'TreeFolderIcon',
  functional: true,
  props: {
    node: {
      type: Object as Prop<IProcessedTreeNode>,
      required: true,
    },
    options: {
      type: Object as Prop<IFullTreeOptions>,
      required: true,
    },
  },
  render(h, { props }) {
    const isNotFolder = !props.options.isExpandable(props.node);

    if (props.options.visual.showIconForFolders === false || isNotFolder) {
      return <div/>;
    }
    /* @ts-ignore */
    return <div class="mr-1"><ClarityIcon size={16}
            name="folder"
        /></div>;
  },
});
</script>

<style scoped>

</style>
