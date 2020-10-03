import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';

interface IExpandAllOptions {
    expandAll?: boolean;
}

const expandAllEvaluator: INodeEvaluator = {
  handleNode(node: IProcessedTreeNode, payload: IExpandAllOptions): void {
    if (payload.expandAll) {
      // eslint-disable-next-line no-param-reassign
      node.__state = 1;
    }
  },
};

export default expandAllEvaluator;
