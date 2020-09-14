import { IProcessedTreeNode } from '@/models/tree-node';

const getVisibleChildren = (object: IProcessedTreeNode) => (object.children.filter(
  (child: IProcessedTreeNode) => child.__visible && !child.__filtered,
));

export default getVisibleChildren;
