# Internal node properties
The section about [custom node properties](/guide/custom-node-properties) shows that you can define your own properties on nodes. The _Performant Vue Tree_ component relies on this approach as well.
The overview below summarizes internal nodes that may exist on each of the node you access through slots and traversal service.

Please note that these attribute **are not** appended to the original data, but only to the copied data within the tree component. Therefore, you cannot use them in your functions tak somehow work with the tree data before they are processed.
On the other hand, you may use them in [node evaluators](/advanced/node-evaluators).

All of the attributes have specific usage and are appended only when needed. Therefore you cannot rely on their existence upfront.


```javascript
interface AddedProperties {
    /** either 'open' or 'closed' * */
    __state?: INodeState;
    /** true when node is currently visible * */
    __visible?: boolean;
    /** true when node has been filtered out * */
    __filtered?: boolean;
    /** true some descendant matched the search term * */
    __leadsToMatched?: boolean;
    /** true when node itself matched the search term * */
    __matched?: boolean;
    /** node nested depth. Root starts at 0 * */
    __depth?: number;
    /** Order of the node in a flattened representation of the trees */
    __index?: number;
}
```

It is advised to not change signature of these attributes (e.g. assigning boolean to *__depth*). However, feel free to assign values to them manually if you wish to control any of these manually. Make sure to use [node evaluators](/advanced/node-evaluators) and [tree traversal](/advanced/tree-traversal) for controlling them, otherwise you would have to use `$forceUpdate` to re-render the tree.

## Processed node
Such a node is marked as **processed**. Effectively, the original [ITreeNode](/guide/basic-usage) interface of a plain node is extended with the **AddedProperties** interface. Therefore, every node that you access from within the tree component conforms to the following combined interface. Note that all the properties are optional. Some of them are assigned at initialization of the tree, others are appended only when needed, generally when traversing through the tree or when toggling the node's state.

```javascript
interface IProcessedTreeNode {
    id: string | number;
    name?: string;
    children: IProcessedTreeNode[];

    __state?: INodeState;
    __visible?: boolean;
    __filtered?: boolean;
    __leadsToMatched?: boolean;
    __matched?: boolean;
    __depth?: number;
    __index?: number;
}
```