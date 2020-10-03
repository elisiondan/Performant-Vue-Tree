import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';

interface IExpandAllOptions {
    collapseAll?: boolean;
}

const expandAllEvaluator: INodeEvaluator = {
  handleNode(node: IProcessedTreeNode, payload: IExpandAllOptions): void {
    if (payload.collapseAll) {
      // eslint-disable-next-line no-param-reassign
      node.__state = 'closed';
    }
  },
};

export default expandAllEvaluator;
