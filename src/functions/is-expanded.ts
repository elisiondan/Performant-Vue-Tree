import NodeState from '@/enums/node-state';
import { IProcessedTreeNode } from '@/models/tree-node';

export default function (node: IProcessedTreeNode | NodeState) {
  if (typeof node === 'string') {
    return node === NodeState.OPEN;
  }

  return node.__state === NodeState.OPEN;
}
