import TreeNode from '@/models/tree-node';
import { INodeEvaluator } from '@/models/node-evaluator';

/**
 * TreeTraversalService is responsible for traversing tree and
 * applying all node handles on each node
 * with passed evaluation data
 */
export default class TreeTraversalService {
  /**
  * Traverse all nodes in all trees
  * @param allTrees trees to traverse
  * @param nodeHandlers node evaluator for each node
  * @param nodeEvaluatorsData data for node evaluators
  * @param topToBottom start from root and traverse down the tree
  */
  traverseAllTrees(allTrees: TreeNode[],
    nodeHandlers: INodeEvaluator[],
    nodeEvaluatorsData: any,
    topToBottom?: boolean) {
    allTrees.forEach((tree) => {
      this.traverseTree(tree, nodeHandlers, nodeEvaluatorsData, topToBottom);
    });
    return allTrees;
  }

  /**
  * Traverse all descendants of given node
  * @param node node to traverse
  * @param nodeHandlers node evaluator for each node
  * @param nodeEvaluatorsData data for node evaluators
  * @param topToBottom start from root and traverse down the tree
  */
  public traverseTree(node: TreeNode,
    nodeHandlers: INodeEvaluator[],
    nodeEvaluatorsData: any,
    topToBottom?: boolean) {
    if (topToBottom) {
      nodeHandlers.forEach((handler) => {
        handler.handleNode(node, nodeEvaluatorsData);
      });
    }

    node.children.forEach((child) => this.traverseTree(child,
      nodeHandlers,
      nodeEvaluatorsData,
      topToBottom));

    if (!topToBottom) {
      nodeHandlers.forEach((handler) => {
        handler.handleNode(node, nodeEvaluatorsData);
      });
    }
  }
}
