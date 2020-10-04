// const NodeState = {
//   CLOSED: 'closed',
//   OPEN: 'open',
// };

export type INodeState = 'closed' | 'open';

enum NodeState {
    CLOSED = 'closed',
    OPEN = 'open'
}

export default NodeState;
