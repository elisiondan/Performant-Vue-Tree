# performant-vue-tree
Lighting fast and highly configurable tree structure.

---
**This component is in development and should not be used in production yet**
---

---
## Installation
TBD


You can either register the component globally 
```javascript
// global plugin
import Vue from 'vue'
import performantTree from 'vue-performant-tree'

Vue.use(performantTree)
```

or import it separately where needed 
```html

<script>
import Vue from 'vue'
import performantTree from 'vue-performant-tree'

export default Vue.extend({
    components: { performantTree }
    ...
})
```

## Usage
The tree component accepts two composite props - data (required) and options (optional)

### Data prop
The `data` prop conforms to the following interface. If you use Typescript, you can reference it directly through 
`import ITreeData from 'vue-performant-tree/src/models/tree-data`.

```javascript
interface ITreeData {
    trees: ITreeNode[];
}
```


```javascript
interface ITreeNode {
    obj: INodeObject;
    children: ITreeNode[];
}
```

```javascript
interface INodeObject {
    id: string | number;    // A unique identifier
    name?: string;
}
```

An example of data conforming to the given interface may be as follows
```javascript
const trees = [
    {
        obj: {
            id: 1,
            name: 'Root 1',
        },
        children: [
            {
                obj: {
                    id: 2,
                    name: 'Child 1 of Root 1',
                },
                children: []
            }
        ]
    },
    {
        obj: {
            id: 3,
            name: 'Root 2',
        },
        children: []
    }
]
```


**Do note** that these are only the _minimal_ required properties. Feel free to add any more properties to the `ITreeNode` objects, especially if you need them in the emitted [events](#events) or for [node evaluators](#node-evaluators).


### Options prop
The options prop is optional if you would like to override some of the default options. Again, if you use Typescript, you may import the interface directly: `import ITreeOptions from 'vue-performant-tree/src/models/tree-options`.

Additionally, you may also import the default options: `import { defaultOptions } from 'vue-performant-tree/src/models/tree-options`.


**Default options**
```javascript
{
  isExpandable: isExpandableNode, // default boolean function deciding whether node can be expanded
  nodeEvaluators: [], // Additional node evaluator 
  matchTermEvaluator: {
    enabled: true,
    highlightClass: 'bg-yellow-400',
  },
  visual: {
    showIconForFolders: true,
    showFolderBorders: true,
  },
};
```


### Slots
You expand or modify appearance of the tree component through available slots.

**prependLabel**
- area in front of the node label (name if available, id otherwise)
- given node is bound to the slot
```html
<tree :data="treeData">
    <template #prependLabel="nodeData">
        ....
    </template>
</tree>
```

**appendLabel**
- area behind node's label (name if available, id otherwise)
- given node is bound to the slot
```html
<tree :data="treeData">
    <template #appendLabel="nodeData">
        ....
    </template>
</tree>
```


### Events
**arrow-click**
- emitted when arrow next to the node is clicked
- emits `node` as argument

---

# Advanced
## Node evaluators
Every interaction that requires to traverse through the whole tree is quite resource expensive. Therefore, the performant vue tree uses service workers in the background to do the heavy lifting and assuring that the UI thread is not blocked.

Whenever you need perform an action that requires the full tree traversal while maintaining the state (open/closed, highlights) etc. or do not wish to use service workers from scratch by yourself, you may use `node evaluators`.

### Creating a node evaluator
An evaluator should be an object that contains a method with the following signature:
```javascript
import { IProcessedTreeNode } from 'vue-performant-tree/src/models/tree-node';

handleNode(node: IProcessedTreeNode, payload: any): void
```

In short, the `handleNode` method received the given node and any kind of payload that is sent through the `treeObserver`. Beware that the payload may contain data for targetted at other evaluators, so it is **responsibility of each evaluator to check whether the data are for them**.

An examplatory implementation of an evaluator that expands each could look like this.
```
// expand-all-evaluator.ts
import { INodeEvaluator } from 'vue-performant-tree/src/services/tree-traversal-service';
import { IProcessedTreeNode } from 'vue-performant-tree/src/models/tree-node';

interface IExpandAllOptions {
    expandAll?: boolean;
}

const expandAllEvaluator: INodeEvaluator = {
  handleNode(node: IProcessedTreeNode, payload: IExpandAllOptions): void {
    if (payload.expandAll) {
      node.__state = 'open';
    }
  },
};

export default expandAllEvaluator;
```

Do note the we check whether the `expandAll` on *payload* argument is **true** (it would have been false if non-existent).

The `__state` attribute is an artificially added attribute for internal purposes. However, you may reassign it manually if you need to override the state programatically. See [additional node atributes](#additional-node-atributes) for details 


** Note on classes **
Beware that you cannot use classes that would implement the `handleNode` method. The methods in classes exist only on their prototype and as such cannot be serialized and passed to the service workers. See this [blog post](https://localazy.com/blog/how-to-pass-function-to-web-workers) for a dive in.

### Registering node evaluator
Once created, you need to add node evaluators to the tree [options](#options-prop). 
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
Once the tree traversal is triggered, each node (starting from root) is visited and evaluated in each evaluator.

### Triggering node evaluators
At this point the evaluator is ready to receive data, so let's use a manual trigger. From anywhere you'd like to trigger the tree traversal, import a `treeObserver`
```javascript
import treeObserver from 'vue-performant-tree/src/services/tree-observer';
```

The `treeObserver` provides following methods
- subscribe (id: string | number, callback: (payload: any) => void)  
Subsrice to events emitted by the observer and perform an action

- notify(payload: any)
Fire an event and pass the payload to all subscribers

- async notifyAsync(payload: any)
Same as notify, only the callbacks are awaited


The `nodeEvaluators` are serialized and used in the `subscribe` indirectly behind the scenes, so you'll mostly need only `notify` (or `notifyAsync`).


To put it to work, we simply need to trigger an event and define appropriate payload argument so we target the right node evaluators
```javascript
import treeObserver from 'vue-performant-tree/src/services/tree-observer';

...
methods: {
    expandAll() {
        treeObserver.notify({
            expandAll: true,
        });
    },
    ...
}
```

To summarize, we've created a node evaluator that implements the `handleNode` method and decides whether the payload, `{expandlAll: true}`, is targetted for it. Since it is, it changes the node's inner state. This applies to all the nodes in the tree.

## Additional node attributes
For the internal purposes, each [tree node](#data-prop) may have additional attributes that determine node visibility. They are mostly set in the provided node evaluators, but for instance, `__state` is also controlled in the internal node component itself.

Here is their full list
```
__state?: INodeState;
__filtered?: boolean;
__hidden?: boolean;
__matched?: boolean;
__leadsToMatched?: boolean;
```

Each attribute is defined as optional, meaning that they are added only once they are first assigned. If you do not use filters for instance, the `__filtered` attribute is never assigned.

You can use reassign these in your [node evaluators](#node-evaluators) by yourself to programatically control the visibility of each node. They are internally used in the following manner:

- __state
Either `open` or `closed`. If `open` and the node has some children, that it is expanded and visible children are rendered

- __filtered
Node does not meet filter conditions and hence is filtered out and not visible

- __hidden
Node should be hidden for some other reason than it was filtered out

- __matched
Node was matched in the [match term evaluator](#options-prop). The importance of this attribute is that when searching, ancestor nodes have to be open all the way to the matched node. The `__matched` marks a stop to the node opening.

- __leadsToMatched
Related to the above, every such node is open so that the eventually _matched_ node is visible.