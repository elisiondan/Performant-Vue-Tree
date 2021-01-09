import isExpandableNode from '@/functions/tree/is-expandable-node';
import root from '../fixtures/root';

describe('is-expandable-node.ts', () => {
  it('should return true if some child is not filtered out and visible', () => {
    const rootNode = root();
    rootNode.children = rootNode.children
      .map((c) => ({ ...c, __filtered: false }));
    expect(isExpandableNode(rootNode)).toBeTruthy();
  });

  it('should return false if all children are filtered out', () => {
    const rootNode = root();
    rootNode.children = rootNode.children.map((c) => ({ ...c, __filtered: true }));
    expect(isExpandableNode(rootNode)).toBeFalsy();
  });
});
