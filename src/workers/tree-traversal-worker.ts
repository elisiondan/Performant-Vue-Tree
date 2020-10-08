/* eslint-disable */
// We need to disable eslint in this file,
// because by default, WorkerPlugin has a separate plugin pipeline
// causing eslint to run on a compiled file

import registerWorker from 'promise-worker/register';
// import FilterTreeService, { ITreeFilters } from '@/modules/common/services/filter-tree/filter-tree-service';
import TreeTraversalService, { INodeEvaluator } from '@/services/tree-traversal-service';
import treeFilterEvaluator from '@/services/node-evaluators/tree-filter-evaluator';
// import InitialMarkingHandler from '@/modules/common/services/tree-traverse/node-handlers/initial-marking-handler';
// import { ITreeSearch } from '@/modules/inventory/models/store/inventory-state';
import { IProcessedTreeNode } from '@/models/tree-node';
// import FilterNodeHandler from '@/modules/common/services/tree-traverse/node-handlers/filter-node-handler';
import JSONfn from 'json-fn';

const treeTraversalService = new TreeTraversalService();

export interface ITraversalInput {
  trees: IProcessedTreeNode[];
//   filterOptions?: ITreeFilters;
//   searchOptions?: ITreeSearch;
  nodeEvaluators?: string[];
  topToBottom?: boolean;
}
export type IItraversalOutput<T extends IProcessedTreeNode> = T[];

export default registerWorker((data) => {
  const { trees } = data;
  const topToBottom = data.topToBottom || false;
  const nodeEvaluators: INodeEvaluator[] = (data.nodeEvaluators || []).map((e: string) => JSONfn.parse(e));
  const nodeEvaluatorsData: any = data.nodeEvaluatorsData

  if (nodeEvaluatorsData.filterOptions) {
      nodeEvaluators.push(treeFilterEvaluator)
  }


  const traversedTrees = treeTraversalService
    .traverseAllTrees(trees, nodeEvaluators, nodeEvaluatorsData, topToBottom);

  return traversedTrees
});
