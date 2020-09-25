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
    topToBottom: boolean) {
    const treesCopy: TreeNode[] = cloneDeep(allTrees);
    treesCopy.forEach((tree) => {
      this.traverseTree(tree, nodeHandlers, topToBottom);
    });
    return treesCopy;
  }

  public traverseTree(node: TreeNode,
    nodeHandlers: INodeEvaluator[],
    topToBottom: boolean) {
    if (topToBottom) {
      nodeHandlers.forEach((handler) => {
        handler.handleNode(node);
      });
    }

    node.children.forEach((child) => this.traverseTree(child, nodeHandlers, topToBottom));

    if (!topToBottom) {
      nodeHandlers.forEach((handler) => {
        handler.handleNode(node);
      });
    }
  }
}
