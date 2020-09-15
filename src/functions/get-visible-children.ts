import { IProcessedTreeNode } from '@/models/tree-node';

const getVisibleChildren = (object: IProcessedTreeNode) => (object.children.filter(
//   (child: IProcessedTreeNode) => child.__visible && !child.__filtered,
  (child: IProcessedTreeNode) => !!child,
));

export default getVisibleChildren;
