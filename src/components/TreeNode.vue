<script lang='tsx'>
import Vue, { PropType, CreateElement } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import getNodesToRender from '@/components/TreeNode/get-nodes-to-render';

const renderSubtree = (h: CreateElement, context: any): JSX.Element => {
  const { props, listeners, scopedSlots } = context;
  const nodes = getNodesToRender(context.props);

  return <TreeNode
    class={{ foo: true, bar: false }}
    isRoot={false}
    active-item-id={props.activeItemId}
    showTreeBorders={props.showTreeBorders}
    node={props.node}
    {...{ on: listeners }}
    {...{ scopedSlots }}
  />;
};

const TreeNode = Vue.extend({
  name: 'TreeNode',
  functional: true,
  props: {
    node: {
      type: Object as PropType<IProcessedTreeNode>,
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
  render(h, context) {
    const { props, listeners } = context;
    const onArrowClick = listeners['item-click'] as Function;
    return <div
            onClick={() => onArrowClick(props.node)}
        >
            {renderSubtree(h, context)}
        </div>;
  },
});

export default TreeNode;
</script>
