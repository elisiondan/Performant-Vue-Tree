import TreeProps from '@/models/props';
import getVisibleChildren from '@/functions/tree/get-visible-children';

export default function (props: TreeProps) {
  const visibleChildren = getVisibleChildren(props.node);

  const getAllNodes = visibleChildren;

  return getAllNodes;
}
