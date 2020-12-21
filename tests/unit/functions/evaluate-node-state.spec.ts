import evaluateNodeState from '@/functions/tree/evaluate-node-state';
import root from '../fixtures/root';

describe('evaluate-node-state.ts', () => {
  it('should return state of node if it has been toggled', () => {
    const rootNode = root();
    rootNode.__state = 'open';
    expect(evaluateNodeState(rootNode)).toEqual('open');

    rootNode.__state = 'closed';
    expect(evaluateNodeState(rootNode)).toEqual('closed');
  });

  it('should return open if node leads to matched and so does some child', () => {
    const rootNode = root();
    rootNode.__leadsToMatched = true;
    rootNode.children[0].__matched = true;
    expect(evaluateNodeState(rootNode)).toEqual('open');
  });

  it('should return cloded if node does not lead to matched', () => {
    const rootNode = root();
    rootNode.__leadsToMatched = false;
    expect(evaluateNodeState(rootNode)).toEqual('closed');
  });
});
