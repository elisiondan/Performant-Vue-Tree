            <ClarityIcon name="angle" />

<script lang="tsx">
import Vue from 'vue';
import ClarityIcon from '@/components/ClarityIcon.vue';
import { Prop } from 'vue/types/options.d';
import isExpanded from '@/functions/is-expanded';
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

    return <div onClick={() => onClick()}>
        {/* @ts-ignore */}
        <ClarityIcon dir={dir}
            name="angle"
            size={16}
        />
    </div>;
  },
});
</script>

<style scoped>

</style>
