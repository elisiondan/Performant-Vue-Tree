/* eslint-disable */
// We need to disable eslint in this file,
// because by default, WorkerPlugin has a separate plugin pipeline
// causing eslint to run on a compiled file

import registerWorker from 'promise-worker/register';
import TreeTraversalService from '@/services/tree-traversal-service';
import { IProcessedTreeNode } from '@/models/tree-node';
import JSONfn from 'json-fn';
import { INodeEvaluator } from '@/models/node-evaluator';

const treeTraversalService = new TreeTraversalService();
// const treeTraversalService = TreeTraversalService;

export interface ITraversalInput {
  trees: IProcessedTreeNode[];
  nodeEvaluators?: string[];
  nodeEvaluatorsData?: any;
  topToBottom?: boolean;
}
export type IItraversalOutput<T extends IProcessedTreeNode> = T[];

export default registerWorker((data) => {
  const { trees } = data;
  const topToBottom = data.topToBottom || false;
  const nodeEvaluators: INodeEvaluator[] = (data.nodeEvaluators || []).map((e: string) => JSONfn.parse(e));
  const { nodeEvaluatorsData } = data;

  const traversedTrees = treeTraversalService
    .traverseAllTrees(trees, nodeEvaluators, nodeEvaluatorsData, topToBottom);

  return traversedTrees;
});
