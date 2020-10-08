import { IProcessedTreeNode } from '@/models/tree-node';
import { IItraversalOutput, ITraversalInput } from '@/workers/tree-traversal-worker';
import JSONfn from 'json-fn';
import WorkerService from '@/services/worker-service';
import TreeTraversalService, { INodeEvaluator } from '@/services/tree-traversal-service';

const treeTraversalWorker = new WorkerService(
  new Worker('@/workers/tree-traversal-worker.ts', { type: 'module' }),
);

const treeTraversalService = new TreeTraversalService();

class TreeParser {
    private fullTree: IProcessedTreeNode[] = [];

    private currentTree: IProcessedTreeNode[] = [];

    public setFullTree(fullTree: IProcessedTreeNode[]) {
      this.fullTree = fullTree;
    }

    public setCurrentTree(tree: IProcessedTreeNode[]) {
      this.currentTree = tree;
    }

    public getCurrentTree() {
      return this.currentTree;
    }

    public traverseTree(nodeEvaluators: INodeEvaluator[], data?: {
        trees? : IProcessedTreeNode[];
        payload?: any;
    }) {
      const trees = (data && data.trees) || this.fullTree;

      return treeTraversalWorker.postMessage<IItraversalOutput<IProcessedTreeNode>>({
        trees,
        nodeEvaluators: nodeEvaluators.map((e) => JSONfn.stringify(e)),
        nodeEvaluatorsData: (data && data.payload) || {},
      } as ITraversalInput);
    }

    public traverseTreeWithoutWorker(nodeEvaluators: INodeEvaluator[], data?: {
        trees? : IProcessedTreeNode[];
        payload?: any;
        topToBottom?: boolean;
    }) {
      const trees = (data && data.trees) || this.fullTree;
      const payload = (data && data.payload) || {};
      const topToBottom = data && data.topToBottom;

      treeTraversalService.traverseAllTrees(trees, nodeEvaluators, payload, topToBottom);
    }
}

const treeParser = new TreeParser();

export default treeParser;
