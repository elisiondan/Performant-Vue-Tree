import { IProcessedTreeNode } from '@/models/tree-node';

const flattenTree = (node: IProcessedTreeNode, depth = 0, nodes: IProcessedTreeNode[] = []) => {
  nodes.push({
    ...node,
    __depth: depth,
  });

  node.children.forEach((n) => {
    flattenTree(n, depth + 1, nodes);
  });
  return nodes;
};

export default flattenTree;
