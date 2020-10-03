/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { INodeEvaluator } from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';
import JSONfn from 'json-fn';

type FilterPrototypes = string[];
type Filter = (node: IProcessedTreeNode) => boolean;

interface FilterOptions {
    filterOptions: {
        operator: 'AND' | 'OR';
        filters: FilterPrototypes[];
    };
}

/**
 * Node evaluator wrapper to allow for easier filtering out of nodes
 * Add simple boolean returing functions to array of filters and set
 * the logical operator (conjuction or disjunction)
 *
 * Naturally, nothing prevents you from defining a wholly custom filter handler
 * and passing it directly as a node evaluator.
 * This is a mere abstraction to simplify a common use case
 */
const treeFilterEvaluator: INodeEvaluator & any = {
  handleNode(node: IProcessedTreeNode, payload: FilterOptions): void {
    node.__filtered = false;

    if (payload.filterOptions.filters.length === 0) {
      return;
    }

    const { filters, operator } = payload.filterOptions;
    const parsedFilters = filters.map((o) => JSONfn.parse(o));

    if (operator === 'AND') {
      node.__filtered = this.andConjuction(node, parsedFilters);
    } else {
      node.__filtered = this.orConjuction(node, parsedFilters);
    }
  },

  andConjuction(node: IProcessedTreeNode, filters: Filter[]) {
    const criteriasCount = filters.length;
    let allPass = true;
    let i = 0;
    while (allPass && criteriasCount > i) {
      allPass = filters[i](node);
      i += 1;
    }

    return allPass;
  },

  orConjuction(node: IProcessedTreeNode, filters: Filter[]) {
    let i = 0;
    const criteriasCount = filters.length;
    let somePass = criteriasCount === 0;
    while (!somePass && criteriasCount > i) {
      somePass = filters[i](node);
      i += 1;
    }

    return somePass;
  },
};

export default treeFilterEvaluator;
