/* eslint-disable  */
import { INodeEvaluator } from '@/services/tree-traversal-service';
// import SearchByTermHandler from '@/modules/common/services/tree-traverse/node-handlers/search-by-term-handler';
// import SearchByGoIdHandler from '@/modules/common/services/tree-traverse/node-handlers/search-by-goid-handler';
import TreeNode from '@/models/tree-node';
// import { ITreeSearch } from '@/modules/inventory/models/store/inventory-state';

/**
 * Aggregating tree search service
*  It applies relevant search tree-node handles based on the passed options
*
* EXTENDING:
* - Implement new searchHandler (using INodeEvaluator)
* - Add the conditional statement here under 'handleNode'
 */
export default class SearchTreeService implements INodeEvaluator {
  private searchOptions: any;

  private matchedNodes: TreeNode[] = [];

  constructor(searchOptions: any) {
    this.searchOptions = searchOptions;
  }

  getMatchedNodes() {
    return this.matchedNodes;
  }

  handleNode(node: TreeNode): void {
    // if (this.searchOptions.term) {
    //   const searchByTermHandler = new SearchByTermHandler(this.searchOptions);
    //   searchByTermHandler.handleNode(node);
    //   this.matchedNodes = searchByTermHandler.matchedNodes;
    // }

    // if (this.searchOptions.goId) {
    //   const searchByGoIdHandler = new SearchByGoIdHandler(this.searchOptions);
    //   searchByGoIdHandler.handleNode(node);
    //   this.matchedNodes = [...this.matchedNodes, ...searchByGoIdHandler.matchedNodes];
    // }
  }
}
