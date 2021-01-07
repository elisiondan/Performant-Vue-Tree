/* eslint-disable no-param-reassign */
import { INodeEvaluator } from '@/models/node-evaluator';

import { IProcessedTreeNode } from '@/models/tree-node';

/**
 * evaluator options if the payload is targetted at this evaluator
 */
interface SearchOptions {
    searchTerm: string;
    removeUnmatched: boolean;
}

interface IMatchTermEvaluator {
    /** Return true if node's name conforms to searched term */
    isMatch: (node: IProcessedTreeNode, regex: RegExp) => boolean;
    /** Return true if current node's descendant is matched */
    doesLeadToMatched: (node: IProcessedTreeNode) => boolean;
    /** return true if node's name is matched or leads to matched */
    shouldBeVisible: (node: IProcessedTreeNode, removeUnmatched: boolean) => boolean;
    /** Mark node's children visibility attributes */
    markNodes: (node: IProcessedTreeNode,
        searchOptions: SearchOptions,
        isMatch: boolean) => IProcessedTreeNode;
    /** Set visibility attribute to true for children */
    makeAllChildrenVisible: (node: IProcessedTreeNode) => IProcessedTreeNode;
}

const matchTermEvaluator: INodeEvaluator & IMatchTermEvaluator = {
  handleNode(node: IProcessedTreeNode, payload: SearchOptions): void {
    const { searchTerm } = payload;

    if (!searchTerm) { return; }

    const regex = new RegExp(searchTerm, 'ig');
    const isMatch = this.isMatch(node, regex);
    if (isMatch && node.name) {
      node.name = node.name.toString().replace(regex, '<span class="bg-yellow-400">$&</span>');
    }

    this.markNodes(node, payload, isMatch);
  },

  isMatch(node: IProcessedTreeNode, regex: RegExp): boolean {
    return !!node.name && regex.test(node.name);
  },

  doesLeadToMatched(node: IProcessedTreeNode) {
    const someChildVisible = node.__leadsToMatched
                            || node.__matched
                            || node.children.some((c) => c.__leadsToMatched || c.__matched);
    return someChildVisible;
  },

  shouldBeVisible(node: IProcessedTreeNode, removeUnmatched: boolean): boolean {
    const nodeVisible = !!(node.__leadsToMatched || node.__matched);
    const someChildVisible = node.children.some((c) => c.__leadsToMatched || c.__matched);

    return removeUnmatched ? (nodeVisible || someChildVisible) : true;
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
    node.__visible = this.shouldBeVisible(node, searchOptions.removeUnmatched);
    if (node.__matched) {
      this.makeAllChildrenVisible(node);
    }

    if (node.__leadsToMatched && node.children.some((child) => child.__leadsToMatched)) {
      node.__state = 'open';
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
      child.__visible = true;
      child = this.makeAllChildrenVisible(child);
      return child;
    });

    node.children = subResult;

    return node;
  },
};

export default matchTermEvaluator;
