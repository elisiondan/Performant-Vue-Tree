import { IProcessedTreeNode } from '@/models/tree-node';

type TreeProps = {
    node: IProcessedTreeNode;
    activeNodeId: string | number;
    isRoot: boolean;
    showBorders: boolean;
};

export default TreeProps;
