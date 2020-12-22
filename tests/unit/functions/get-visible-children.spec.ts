import getVisibleChildren from '@/functions/tree/get-visible-children';
import root from '../fixtures/root';

describe('get-visible-children.ts', () => {
  it('should return visible children', () => {
    const rootNode = root();
    rootNode.children = rootNode.children.map((c) => ({ ...c, __visible: true }));
    expect(getVisibleChildren(rootNode)).toStrictEqual(rootNode.children);
  });

  it('should not return filtered out children', () => {
    const rootNode = root();
    rootNode.children = rootNode.children.map((c) => ({ ...c, __visible: true, __filtered: true }));
    expect(getVisibleChildren(rootNode)).toStrictEqual([]);
  });
});
