import flattenTree from '@/functions/tree/flatten-tree';
import { IProcessedTreeNode } from '@/models/tree-node';
import root from '../fixtures/root';

describe('flatten-tree.ts', () => {
  it('should return flat tree', () => {
    const rootNode = root();
    const flatTree = flattenTree(
      rootNode,
      0,
      0,
      [],
      (node: IProcessedTreeNode) => node.children.length > 0,
    );
    expect(flatTree.length).toEqual(6);
  });
});
