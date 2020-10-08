import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';

interface IExpandAllOptions {
    $_setVisibilityEvaluator?: boolean;
}

const expandAllEvaluator: INodeEvaluator = {
  handleNode(node: IProcessedTreeNode, payload: IExpandAllOptions): void {
    if (payload.$_setVisibilityEvaluator === undefined) { return; }
    node.__visible = !!payload.$_setVisibilityEvaluator;
  },
};

export default expandAllEvaluator;
