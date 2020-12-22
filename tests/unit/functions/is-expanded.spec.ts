import NodeState from '@/enums/node-state';
import isExpanded from '@/functions/tree/is-expanded';
import root from '../fixtures/root';

describe('is-expanded.ts', () => {
  it('should return true if node is expanded', () => {
    const rootNode = root();
    rootNode.__state = 'open';
    expect(isExpanded(rootNode)).toBeTruthy();
  });

  it('should return false if node is collapsed', () => {
    const rootNode = root();
    rootNode.__state = 'closed';
    expect(isExpanded(rootNode)).toBeFalsy();
  });

  it('should return true if argument is open', () => {
    expect(isExpanded(NodeState.OPEN)).toBeTruthy();
  });

  it('should return false if argument is closed', () => {
    expect(isExpanded(NodeState.CLOSED)).toBeFalsy();
  });
});
