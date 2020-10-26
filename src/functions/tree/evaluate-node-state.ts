import { IProcessedTreeNode } from '@/models/tree-node';
import NodeState from '@/enums/node-state';

const openHasNotBeenToggled = (node: IProcessedTreeNode) => node.__state === undefined;

export default (node: IProcessedTreeNode) => {
  if (openHasNotBeenToggled(node)) {
    const { __leadsToMatched } = node;
    const someChildMatched = node.children
      .some((child) => child.__matched || child.__leadsToMatched);
    const shouldBeOpen = !!__leadsToMatched && someChildMatched;
    return shouldBeOpen ? NodeState.OPEN : NodeState.CLOSED;
  }

  return node.__state;
};
