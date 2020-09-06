<template functional>
  <div
    v-bind="data.attrs"
    @click="listeners['item-click'](props.node)"
  >
    {{ props.node }}
  </div>
</template>

<script lang='tsx'>
import Vue, { PropType } from 'vue';
import ITreeNode from '@/models/tree-node';

export default Vue.extend({
  name: 'TreeNode',
  functional: true,
  props: {
    node: {
      type: Object as PropType<ITreeNode>,
      required: true,
    },
    activeNodeId: {
      type: [String, Number],
      default: -1,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    showBorders: {
      type: Boolean,
      default: false,
    },
  },
  // render(h, context) {
  //   const onArrowClick = context.listeners['arrow-click'] as Function;
  //   return <div
  //             onClick={() => {
  //               onArrowClick(context.props.node);
  //             }}
  //           >Hi</div>;
  // },
});
</script>
