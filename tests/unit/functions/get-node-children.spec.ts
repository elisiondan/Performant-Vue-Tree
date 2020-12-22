import getSubtree from '@/functions/tree/get-subtree';
import TreeProps from '@/models/props';
import root from '../fixtures/root';

describe('get-subtree.ts', () => {
  it('should return visible children', () => {
    const rootNode = root();
    rootNode.children = rootNode.children.map((c) => ({ ...c, __visible: true }));
    const nodeProps: TreeProps = {
      node: rootNode,
      isRoot: true,
    };
    expect(getSubtree(nodeProps)).toStrictEqual(rootNode.children);
  });
});
