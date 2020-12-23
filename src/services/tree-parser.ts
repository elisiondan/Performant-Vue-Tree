import { IProcessedTreeNode } from '@/models/tree-node';
import { IItraversalOutput, ITraversalInput } from '@/workers/tree-traversal-worker';
import JSONfn from 'json-fn';
import WorkerService from '@/services/worker-service';
import { INodeEvaluator } from '@/models/node-evaluator';
// import TestWorker from './test-worker';

const treeTraversalWorker = new WorkerService(
  new Worker('@/workers/tree-traversal-worker.ts', { type: 'module' }),
);
console.warn(treeTraversalWorker);

/**
 * The TreeParser is responsible for triggering the tree traversal
 * worker for off-main-thread calculations.
 */
class TreeParser {
  public async traverseTree(nodeEvaluators: INodeEvaluator[], data?: {
        trees? : IProcessedTreeNode[];
        payload?: any;
    }): Promise<IProcessedTreeNode[]> {
    const trees = (data && data.trees) || [];

    const a = await treeTraversalWorker.postMessage<IItraversalOutput<IProcessedTreeNode>>({
      trees,
      nodeEvaluators: nodeEvaluators.map((e) => JSONfn.stringify(e)),
      nodeEvaluatorsData: (data && data.payload) || {},
    } as ITraversalInput);

    return a;
  }
}

const treeParser = new TreeParser();

export default treeParser;
