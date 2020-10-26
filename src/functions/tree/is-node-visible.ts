import { IProcessedTreeNode } from '@/models/tree-node';

const isNodeVisible = (node: IProcessedTreeNode) => node.__visible && !node.__filtered;

export default isNodeVisible;
