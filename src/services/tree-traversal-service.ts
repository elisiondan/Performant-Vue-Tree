import { cloneDeep } from 'lodash';
import TreeNode from '@/models/tree-node';

export interface INodeEvaluator {
  handleNode(node: TreeNode, payload?: any): void;
}

/**
 * Traverse tree and apply array of node handlers on each node
 * Should be used as a single tool of tree traversing
 */
export default class TreeTraversalService {
  traverseAllTrees(allTrees: TreeNode[],
    nodeHandlers: INodeEvaluator[],
    nodeEvaluatorsData: any,
    topToBottom: boolean) {
    const treesCopy: TreeNode[] = cloneDeep(allTrees);
    treesCopy.forEach((tree) => {
      this.traverseTree(tree, nodeHandlers, nodeEvaluatorsData, topToBottom);
    });
    return treesCopy;
  }

  public traverseTree(node: TreeNode,
    nodeHandlers: INodeEvaluator[],
    nodeEvaluatorsData: any,
    topToBottom: boolean) {
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
