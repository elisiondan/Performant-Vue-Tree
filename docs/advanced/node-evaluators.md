# Node evaluators
Every interaction that requires to traverse through the whole tree is quite resource expensive. Therefore, the *Performant Vue tree* uses service workers in the background to do the heavy lifting, thus assures that the UI thread is not blocked.

Whenever you need perform an action that requires the full tree traversal while maintaining the state (open/closed, highlights) etc. or do not wish to use service workers from scratch by yourself, you may use `node evaluators`. 

## Creating a node evaluator
An evaluator should be an object that contains a method with the following signature:
```javascript
import { IProcessedTreeNode } from 'vue-performant-tree/src/models/tree-node'; // TBD

handleNode(node: IProcessedTreeNode, payload: any): void
```

In short, the `handleNode` method receives the given node and any kind of payload that is sent by the [treeObserver](/advanced/tree-traversal). Beware that the payload may contain data targeted for at other evaluators, so it is **responsibility of each evaluator to check whether the data are for them**.

An exemplary implementation of an evaluator that expands each node with children could look like this.
```javascript
// expand-all-evaluator.ts
import { INodeEvaluator } from 'performant-vue-tree/dist/models/node-evaluator';
import { IProcessedTreeNode } from 'performant-vue-tree/dist/models/tree-node';

interface IExpandAllOptions {
    expandAll?: boolean;
}

const expandAllEvaluator: INodeEvaluator = {
  handleNode(node: IProcessedTreeNode, payload: IExpandAllOptions): void {
    if (payload.expandAll) {
      node.__state = 'open';
      node.__visible = true;
    }
  },
};

export default expandAllEvaluator;

```
Do note the we check whether the `expandAll` on *payload* argument is **true** (it would have been false if undefined). When it is, setting the type of payload enabled suggestions and type checking later in the code. Naturally, this is not precise, because we do not know upfront it's truly the given type. Ideally, it should be set to unknown and only then resolved whether it's the required type or not. The scale of type checking is up to you.

The `__state` attribute is an artificially added attribute for internal purposes. However, you may reassign it manually if you need to override the state programmatically. See [additional node attributes](/guide/internal-node-attributes) for details.

**Note about ES6 classes**
Beware that you cannot use classes that would implement the `handleNode` method. The methods in classes exist only on their prototype and as such cannot be serialized and passed to the service workers. See this [blog post](https://localazy.com/blog/how-to-pass-function-to-web-workers) for a more details.

## Registering node evaluator
Once created, you need to add node evaluators to the tree [options](/guide/options). 
```javascript
import ExpandAllEvaluator from './expand-all-evaluator';

computed: {
    options() {
        return {
            nodeEvaluators: [ExpandAllEvaluator],
        };
    },
},
```

You may add as many evaluators as you want, but beware that they are executed in order. 
Once the [tree traversal](/advanced/tree-observer) is triggered, each node (starting from root) is visited and evaluated in each evaluator.