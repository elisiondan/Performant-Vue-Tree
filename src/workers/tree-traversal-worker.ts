/* eslint-disable */
// We need to disable eslint in this file,
// because by default, WorkerPlugin has a separate plugin pipeline
// causing eslint to run on a compiled file

import registerWorker from 'promise-worker/register';
// import FilterTreeService, { ITreeFilters } from '@/modules/common/services/filter-tree/filter-tree-service';
import TreeTraversalService, { INodeEvaluator } from '@/services/tree-traversal-service';
// import InitialMarkingHandler from '@/modules/common/services/tree-traverse/node-handlers/initial-marking-handler';
// import { ITreeSearch } from '@/modules/inventory/models/store/inventory-state';
import TreeNode from '@/models/tree-node';
// import FilterNodeHandler from '@/modules/common/services/tree-traverse/node-handlers/filter-node-handler';
// @ts-ignore
import JSONfn from 'json-fn';

const treeTraversalService = new TreeTraversalService();

export interface ITraversalInput {
  tree: TreeNode;
//   filterOptions?: ITreeFilters;
//   searchOptions?: ITreeSearch;
  nodeEvaluators?: string[];
  topToBottom?: boolean;
}
export interface IItraversalOutput<T extends TreeNode> {
  tree: T;
  matchedNodes: TreeNode[];
}

export default registerWorker((data) => {
  const { tree } = data;
  const topToBottom = data.topToBottom || false;
  const nodeEvaluators: INodeEvaluator[] = data.nodeEvaluators.map((e: string) => JSONfn.parse(e));
  const nodeEvaluatorsData: any = data.nodeEvaluatorsData
  const matchedNodes: TreeNode[] = [];


  const traversedTrees = treeTraversalService
    .traverseAllTrees([tree], nodeEvaluators, nodeEvaluatorsData, topToBottom);

  return {
    tree: traversedTrees[0],
    matchedNodes,
  };
});
