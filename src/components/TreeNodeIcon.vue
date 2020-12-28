<script lang="tsx">
import Vue from 'vue';
import PvtClarityIcon from '@/components/support/PvtClarityIcon.vue';
import { Prop } from 'vue/types/options.d';
import { IFullTreeOptions } from '@/models/tree-options';
import { IProcessedTreeNode } from '@/models/tree-node';

export default Vue.extend({
  name: 'TreeNodeIcon',
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
    const isFolder = props.options.isExpandable(props.node);
    const iconName = isFolder ? 'folder' : 'file';
    let classes = 'tree-node-icon mr-2';
    classes += !isFolder ? ' ml-1' : '';

    /* @ts-ignore */
    return <div class={classes}><PvtClarityIcon size={16}
            name={iconName}
        /></div>;
  },
});
</script>
