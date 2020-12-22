import NodeState from '@/enums/node-state';
import isNodeVisible from '@/functions/tree/is-node-visible';
import root from '../fixtures/root';

describe('is-node-visible.ts', () => {
  it('should return true if node is visible and not filtered out', () => {
    const rootNode = root();
    rootNode.__visible = true;
    rootNode.__filtered = false;
    expect(isNodeVisible(rootNode)).toBeTruthy();
  });

  it('should return false if node is not visible', () => {
    const rootNode = root();
    rootNode.__visible = false;
    rootNode.__filtered = false;
    expect(isNodeVisible(rootNode)).toBeFalsy();
  });

  it('should return false if node is filtered out', () => {
    const rootNode = root();
    rootNode.__visible = false;
    rootNode.__filtered = true;
    expect(isNodeVisible(rootNode)).toBeFalsy();
  });
});
