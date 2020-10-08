import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';

interface VisibleNodesEvaluator {
    visibleNodes: IProcessedTreeNode[];
    reset: () => void;
}

const expandAllEvaluator: INodeEvaluator & VisibleNodesEvaluator = {
  visibleNodes: [],

  handleNode(node: IProcessedTreeNode): void {
    if (node.__visible) {
      this.visibleNodes.push(node);
    }
  },

  reset() {
    this.visibleNodes = [];
  },
};

export default expandAllEvaluator;
