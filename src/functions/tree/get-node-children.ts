import { IProcessedTreeNode } from '@/models/tree-node';

// eslint-disable-next-line arrow-body-style
export default (node: IProcessedTreeNode): IProcessedTreeNode[] => node.children;
