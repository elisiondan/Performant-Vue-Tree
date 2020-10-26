import { IProcessedTreeNode } from '@/models/tree-node';

const getVisibleChildren = (node: IProcessedTreeNode) => (node.children.filter(
  (child: IProcessedTreeNode) => child.__visible && !child.__filtered,
));

export default getVisibleChildren;
