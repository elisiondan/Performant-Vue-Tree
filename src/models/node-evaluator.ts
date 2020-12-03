import ITreeNode from '@/models/tree-node';

export interface INodeEvaluator {
    handleNode(node: ITreeNode, payload?: any): void;
}
