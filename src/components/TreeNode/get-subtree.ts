import TreeProps from '@/components/TreeNode/props';
import getVisibleChildren from '@/functions/get-visible-children';

export default function (props: TreeProps) {
  const visibleChildren = getVisibleChildren(props.node);

  const getAllNodes = visibleChildren;

  return getAllNodes;
}
