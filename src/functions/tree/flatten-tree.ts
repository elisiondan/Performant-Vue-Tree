import { IProcessedTreeNode } from '@/models/tree-node';

const flattenTree = (
  node: IProcessedTreeNode,
  depth = 0,
  index: number,
  nodes: IProcessedTreeNode[] = [],
  isExpandableNode: (node: IProcessedTreeNode) => boolean,
) => {
  nodes.push({
    ...node,
    __depth: depth,
    __index: index,
  });

  node.children.forEach((n, i) => {
    flattenTree(n, depth + 1, index + i + 1, nodes, isExpandableNode);
  });

  node.children = node.children
    .sort((a, b) => (+isExpandableNode(b)) - (+isExpandableNode(a)));

  return nodes;
};

export default flattenTree;
