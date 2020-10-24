<script lang='tsx'>
import Vue, { PropType, CreateElement } from 'vue';
import { IProcessedTreeNode } from '@/models/tree-node';
import getNodesToRender from '@/components/TreeNode/get-nodes-to-render';
import TreeExpandArrow from '@/components/TreeExpandArrow.vue';
import TreeFolderIcon from '@/components/TreeFolderIcon.vue';
import { IFullTreeOptions } from '@/models/tree-options';
import evaluateNodeState from '@/functions/evaluate-node-state';
import TreeVirtualScroller from '@/components/TreeVirtualScroller.vue';

const renderSubtree = (h: CreateElement, context: any) => {
  const { props, listeners, scopedSlots } = context;
  const nodesToRender = getNodesToRender(props);

  //   @ts-ignore
  //   const test = <TreeVirtualScroller items={nodesToRender} item-size={32}>
  //     <template v-slot="{item}">
  //         {{ item }}
  //     </template>
  //   </TreeVirtualScroller>;
  //   console.log(test);

  return nodesToRender.reduce((acc, node) => {
    const treeNode = <TreeNode
        class="pl-4 ml-2 "
        isRoot={false}
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
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  render(h, context) {
    const {
      props, data, listeners, scopedSlots,
    } = context;
    const onArrowClick = listeners['arrow-click'] as Function;
    const { options } = props;

    props.node.__state = evaluateNodeState(props.node);

    return <div class={`transition-border 
                        ${options.visual.showFolderBorders && !props.isRoot ? 'border-l border-dashed border-gray-500' : ''} 
                        ${data.class ? data.class : ''} `}>
            <div class="mt-1 transition-bg leading-tight flex flex-auto items-center cursor-pointer ">
                {/* @ts-ignore */}
                <TreeExpandArrow node={props.node}
                    options={props.options}
                    onClick={() => onArrowClick(props.node)}
                 />

                {scopedSlots.prependLabel({
                  node: props.node,
                })}
                {/* @ts-ignore */}
                <TreeFolderIcon node={props.node}
                    options={props.options}
                 />
                <div class="label">
                    <span domPropsInnerHTML={props.node.obj.name || props.node.id}></span>
                </div>
            </div>
            {renderSubtree(h, context)}
        </div>;
  },
});

export default Vue.extend(TreeNode);
</script>

<style lang="postcss" scoped>
.arrow--hidden {
  @apply hidden;
}
</style>
