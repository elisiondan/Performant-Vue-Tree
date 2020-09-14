import ITreeNode from '@/models/tree-node';

// TODO
// eslint-disable-next-line arrow-body-style
export default (node: ITreeNode): boolean => node.children.filter(() => {
  // (child) => !child.filteredOut
  return true;
}).length > 0;
