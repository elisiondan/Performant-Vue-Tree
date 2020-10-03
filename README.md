# perfomant-vue-tree
Lighting fast and highly configurable tree structure.


## Installation
TBD


You can either register the component globally 
```
// global plugin
import Vue from 'vue'
import PerfomantTree from 'vue-performant-tree'

Vue.use(PerfomantTree)
```

or import it separately where needed 
```

<script>
import Vue from 'vue'
import PerfomantTree from 'vue-performant-tree'

export default Vue.extend({
    components: { PerfomantTree }
    ...
})
```

## Usage
The tree component accepts two composite props - data (required) and options (optional)

### Data prop
The `data` prop conforms to the following interface. If you use Typescript, you can reference it directly through 
`import ITreeData from 'vue-performant-tree/src/models/tree-data`.

```
interface ITreeData {
    trees: ITreeNode[];
}
```


```
interface ITreeNode {
    obj: INodeObject;
    children: ITreeNode[];
}
```

```
interface INodeObject {
    id: string | number;    // A unique identifier
    name?: string;
}
```

An example of data conforming to the given interface may be as follows
```
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


**Do note** that these are only the _minimal_ required properties. Feel free to add any more properties to the `ITreeNode` objects, especially if you need them in the emitted `events` or for `node evaluators`.


### Options prop
The options prop is optional if you would like to override some of the default options. Again, if you use Typescript, you may import the interface directly: `import ITreeOptions from 'vue-performant-tree/src/models/tree-options`.

Additionally, you may also import the default options: `import { defaultOptions } from 'vue-performant-tree/src/models/tree-options`.


**Default options**
```
{
  isExpandable: isExpandableNode, // default boolean function deciding whether node can be expanded
  nodeEvaluators: [] // Additional node evaluator 
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
```
<tree :data="treeData">
    <template #prependLabel="nodeData">
        ....
    </template>
</tree>
```

**appendLabel**
- area behind node's label (name if available, id otherwise)
- given node is bound to the slot
```
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
