import TreeProps from '@/components/TreeNode/props';
import NodeState from '@/enums/node-state';
import isExpandableNode from '@/functions/is-expandable-node';
import getSubtree from '@/components/TreeNode/get-subtree';

export default function (props: TreeProps) {
  const isExpanded = NodeState.OPEN === props.node.__state && isExpandableNode(props.node);

  if (isExpanded) {
    const content = getSubtree(props);
    return content;
  }
  return '';
}
