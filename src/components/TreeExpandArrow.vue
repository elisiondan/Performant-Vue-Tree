<script lang="tsx">
import Vue from 'vue';
import PvtClarityIcon from '@/components/support/PvtClarityIcon.vue';
import { Prop } from 'vue/types/options.d';
import isExpanded from '@/functions/tree/is-expanded';
import { IProcessedTreeNode } from '@/models/tree-node';
import { IFullTreeOptions } from '@/models/tree-options';

export default Vue.extend({
  name: 'TreeExpandArrow',
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
  render(h, { props, listeners }) {
    const onClick = listeners.click as Function;
    if (props.options.isExpandable(props.node) === false) {
      return <div/>;
    }

    const dir = isExpanded(props.node) ? 'down' : 'right';

    return <div onClick={(e: Event) => onClick(e)} class="tree-expand mr-1">
        {/* @ts-ignore */}
        <PvtClarityIcon dir={dir}
            name="angle"
            size={20}
        />
    </div>;
  },
});
</script>
