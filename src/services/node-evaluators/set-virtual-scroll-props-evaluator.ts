import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';

interface VisibleNodesEvaluator {
    startYPosition: number;
    nodeIndex: number;
    reset: () => void;
}

const expandAllEvaluator: INodeEvaluator & VisibleNodesEvaluator = {
  startYPosition: 0,
  nodeIndex: 0,

  handleNode(node: IProcessedTreeNode): void {
    node.__virtualVisible = false;
    if (node.__visible) {
      node.__nodeIndex = this.nodeIndex;
      node.__height = 20.34;
      node.__yPosition = this.startYPosition - (this.nodeIndex * node.__height);
      this.nodeIndex += 1;
    }
  },

  reset() {
    this.nodeIndex = 0;
  },
};

export default expandAllEvaluator;
