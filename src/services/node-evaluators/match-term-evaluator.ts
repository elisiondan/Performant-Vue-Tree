/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';

interface SearchOptions {
    searchTerm: string;
    removeUnmatched: boolean;
}

const matchTermEvaluator: INodeEvaluator & any = {
  handleNode(node: IProcessedTreeNode, payload: SearchOptions): void {
    const { searchTerm } = payload;

    if (!searchTerm) { return; }

    const regex = new RegExp(searchTerm, 'ig');
    const isMatch = this.isMatch(node, regex);
    if (isMatch && node.obj.name) {
      node.obj.name = node.obj.name.toString().replace(regex, '<span class="bg-yellow-400">$&</span>');
    }

    this.markNodes(node, payload, isMatch);
  },

  isMatch(node: IProcessedTreeNode, regex: RegExp): boolean {
    return !!node.obj.name && regex.test(node.obj.name);
  },

  // PRIVATE METHODS
  doesLeadToMatched(node: IProcessedTreeNode) {
    const someChildVisible = node.__leadsToMatched
                            || node.__matched
                            || node.children.some((c) => c.__leadsToMatched || c.__matched);
    return someChildVisible;
  },

  shouldBeHidden(node: IProcessedTreeNode, removeUnmatched: boolean) {
    const nodeHidden = !node.__leadsToMatched && !node.__matched;
    const childrenHidden = !node.children.some((c) => c.__leadsToMatched || c.__matched);

    return removeUnmatched ? (nodeHidden && childrenHidden) : false;
  },

  /**
   * Evaluate for node whether
   * - is a match
   * - leads to a __matched node
   * - should be visible
   * @param nodeParam
   * @param value
   */
  markNodes(node: IProcessedTreeNode, searchOptions: SearchOptions, isMatch: boolean) {
    if (isMatch && node.__filtered !== true) {
      node.__matched = true;
    } else {
      node.__matched = false;
    }

    node.__leadsToMatched = this.doesLeadToMatched(node);
    node.__hidden = this.shouldBeHidden(node, searchOptions.removeUnmatched);
    if (node.__matched) {
      this.makeAllChildrenVisible(node);
    }

    return node;
  },

  /**
   * Make all children of the current node visible
   * @param node tree node
   */
  makeAllChildrenVisible(node: IProcessedTreeNode) {
    let subResult: Array<IProcessedTreeNode> = [];

    subResult = node.children.map((child: IProcessedTreeNode) => {
      child.__hidden = false;
      child = this.makeAllChildrenVisible(child);
      return child;
    });

    node.children = subResult;

    return node;
  },
};

export default matchTermEvaluator;
