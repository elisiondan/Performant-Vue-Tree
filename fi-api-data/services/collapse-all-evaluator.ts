import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';

interface IExpandAllOptions {
    collapseAll?: boolean;
    rootsId: number[];
}

const expandAllEvaluator: INodeEvaluator = {
  handleNode(node: IProcessedTreeNode, payload: IExpandAllOptions): void {
    if (payload.collapseAll && payload.rootsId) {
      // eslint-disable-next-line no-param-reassign
      node.__state = 'closed';
      if (!payload.rootsId.find((id) => id === node.id)) {
        node.__visible = false;
      }
    }
  },
};

export default expandAllEvaluator;
