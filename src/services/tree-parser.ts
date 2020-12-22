/* eslint-disable no-restricted-globals */
import TreeNode, { IProcessedTreeNode } from '@/models/tree-node';
import JSONfn from 'json-fn';
import WorkerService from '@/services/worker-service';
import { INodeEvaluator } from '@/models/node-evaluator';

// import registerWorker from 'promise-worker/register';
// import TreeTraversalService from '@/services/tree-traversal-service';
// import workerFunction, { IItraversalOutput, ITraversalInput } from './tree-traversal-worker';

import registerWorker from 'promise-worker/register';
// import treeTraversalService from '@/services/tree-traversal-service';

// const treeTraversalService = new TreeTraversalService();

export interface ITraversalInput {
  trees: IProcessedTreeNode[];
  nodeEvaluators?: string[];
  nodeEvaluatorsData?: any;
  topToBottom?: boolean;
}
export type IItraversalOutput<T extends IProcessedTreeNode> = T[];

function workerCode() {
  const treeTraversalService = {
    /**
  * Traverse all nodes in all trees
  * @param allTrees trees to traverse
  * @param nodeHandlers node evaluator for each node
  * @param nodeEvaluatorsData data for node evaluators
  * @param topToBottom start from root and traverse down the tree
  */
    traverseAllTrees(allTrees: TreeNode[],
      nodeHandlers: INodeEvaluator[],
      nodeEvaluatorsData: any,
      topToBottom?: boolean) {
      allTrees.forEach((tree) => {
        this.traverseTree(tree, nodeHandlers, nodeEvaluatorsData, topToBottom);
      });
      return allTrees;
    },

    /**
  * Traverse all descendants of given node
  * @param node node to traverse
  * @param nodeHandlers node evaluator for each node
  * @param nodeEvaluatorsData data for node evaluators
  * @param topToBottom start from root and traverse down the tree
  */
    traverseTree(node: TreeNode,
      nodeHandlers: INodeEvaluator[],
      nodeEvaluatorsData: any,
      topToBottom?: boolean) {
      if (topToBottom) {
        nodeHandlers.forEach((handler) => {
          handler.handleNode(node, nodeEvaluatorsData);
        });
      }

      node.children.forEach((child) => this.traverseTree(child,
        nodeHandlers,
        nodeEvaluatorsData,
        topToBottom));

      if (!topToBottom) {
        nodeHandlers.forEach((handler) => {
          handler.handleNode(node, nodeEvaluatorsData);
        });
      }
    },
  };

  self.onmessage = function (event: any) {
    console.log('Got message from parent', event.data);

    const { data } = event;
    const { trees } = data;
    const topToBottom = data.topToBottom || false;
    const nodeEvaluators: INodeEvaluator[] = (data.nodeEvaluators || [])
      .map((e: string) => JSON.parse(e));
    const { nodeEvaluatorsData } = data;

    const traversedTrees = treeTraversalService
      .traverseAllTrees(trees, nodeEvaluators, nodeEvaluatorsData, topToBottom);

    (self as any as Worker).postMessage(traversedTrees);
  };
  setTimeout(() => {
    (self as any as Worker).postMessage('Message From Worker');
  }, 2000);
}

const blob = new Blob([
  `(${workerCode.toString()})()`,
], { type: 'text/javascript' });

// Note: window.webkitURL.createObjectURL() in Chrome 10+.
const worker = new Worker(window.URL.createObjectURL(blob));

// worker.onmessage = ((data: any) => {
//   console.warn(data);
// registerWorker((data) => {
//   const { trees } = data;
//   const topToBottom = data.topToBottom || false;
//   const nodeEvaluators: INodeEvaluator[] = (data.nodeEvaluators || [])
//     .map((e: string) => JSONfn.parse(e));
//   const { nodeEvaluatorsData } = data;

//   const traversedTrees = treeTraversalService
//     .traverseAllTrees(trees, nodeEvaluators, nodeEvaluatorsData, topToBottom);

//   return traversedTrees;
// });
// });

const treeTraversalWorker = new WorkerService(
  worker,
//   new Worker('@/workers/tree-traversal-worker.ts', { type: 'module' }),
);

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

    worker.postMessage({
      trees,
      nodeEvaluators: nodeEvaluators.map((e) => JSONfn.stringify(e)),
      nodeEvaluatorsData: (data && data.payload) || {},
    } as ITraversalInput);

    return new Promise((resolve) => {
      worker.onmessage = function (e) {
        console.warn(`Received: ${e.data}`);
      };
      resolve(trees);
    });

    // const result = await treeTraversalWorker.postMessage({
    //   trees,
    //   nodeEvaluators: nodeEvaluators.map((e) => JSONfn.stringify(e)),
    //   nodeEvaluatorsData: (data && data.payload) || {},
    // } as ITraversalInput);

    // console.warn(result);
  }
}

const treeParser = new TreeParser();

export default treeParser;
