import TreeProps from '@/functions/tree/props';
import NodeState from '@/enums/node-state';
import isExpandableNode from '@/functions/tree/is-expandable-node';
import getSubtree from '@/functions/tree/get-subtree';
import { IProcessedTreeNode } from '@/models/tree-node';

export default function (props: TreeProps) {
  const isExpanded = NodeState.OPEN === props.node.__state && isExpandableNode(props.node);

  if (isExpanded) {
    const content = getSubtree(props);
    return content;
  }
  return [] as IProcessedTreeNode[];
}
