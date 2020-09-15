<script lang='tsx'>
import Vue, { PropType, CreateElement } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import getNodesToRender from '@/components/TreeNode/get-nodes-to-render';
import TreeExpandArrow from '@/components/TreeExpandArrow.vue';
import { IFullTreeOptions } from '@/models/tree-options';

const renderSubtree = (h: CreateElement, context: any) => {
  const { props, listeners, scopedSlots } = context;
  const nodesToRender = getNodesToRender(props);

  return nodesToRender.reduce((acc, node) => {
    const treeNode = <TreeNode
        class="pl-3 ml-2"
        isRoot={props.isRoot}
        active-item-id={props.activeItemId}
        showTreeBorders={props.showTreeBorders}
        node={node}
        options={props.options}
        {...{ on: listeners }}
        {...{ scopedSlots }}
    />;
    acc.push(treeNode);

    return acc;
  }, [] as JSX.Element[]);
};

const TreeNode: any = Vue.extend({
  name: 'TreeNode',
  functional: true,
  props: {
    node: {
      type: Object as PropType<IProcessedTreeNode>,
      required: true,
    },
    options: {
      type: Object as PropType<IFullTreeOptions>,
      default: () => ({}),
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
    const { props, data, listeners } = context;
    const onArrowClick = listeners['item-click'] as Function;
    return <div class={`transition-border border-l border-dashed${data.class ? data.class : ''}`}>
            <div class="mt-1 transition-bg leading-tight flex flex-auto items-center cursor-pointer">
                {/* @ts-ignore */}
                <TreeExpandArrow node={props.node}
                    options={props.options}
                    onClick={() => onArrowClick(props.node)}
                 />

                <div class="label">
                <span domPropsInnerHTML={props.node.obj.name || props.node.obj.id}></span>
                </div>
            </div>
            {renderSubtree(h, context)}
        </div>;
  },
});

export default TreeNode;
</script>

<style lang="postcss" scoped>
.arrow--hidden {
  @apply hidden;
}
</style>
