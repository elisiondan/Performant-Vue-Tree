import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';

/**
 * evaluator options if the payload is targetted at this evaluator
 */
interface IExpandAllOptions {
    $_setVisibilityEvaluator?: boolean;
}

/**
 * Change visibility of the node
 */
const expandAllEvaluator: INodeEvaluator = {
  handleNode(node: IProcessedTreeNode, payload: IExpandAllOptions): void {
    if (payload.$_setVisibilityEvaluator === undefined) { return; }
    node.__visible = !!payload.$_setVisibilityEvaluator;
  },
};

export default expandAllEvaluator;
