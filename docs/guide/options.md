# Options
The options prop is optional if you would like to override some of the default options. Again, if you use Typescript, you may import the interface directly: `import ITreeOptions from 'vue-performant-tree/src/models/tree-options`.


The options prop is optional. You may override some of the default options or all of them. If you use TypeScript, you may import the interface directly: TBD

```javascript
{
    /* Whether node can be expanded or is a leaf node */
    isExpandable (node: ITreeNode): boolean;
    /* Virtual scrolling is crucial when using large number of nodes */
    virtualScrolling: {
        useVirtualScrolling: boolean;
        /* When enabled, you have to define the minimal node's height. 
           Does not matter if some are bigger */
        minItemSize: number;
    };
    /* Node evaluators executed during tree traversal. See TBD */
    nodeEvaluators: INodeEvaluator[];
    /* Search by node name utility */
    matchTermEvaluator: {
        enabled: boolean;
        /* Classname appended to nodes that match the search term */
        highlightClass: string;
    };
    /* Varisous visual options of the tree */
    visual: {
        /* Show icons for folders (i.e. nodes for which isExpandle is true) */
        showIconForFolders: boolean;
        /* Show left dotted line for folder's content */
        showFolderBorders: boolean;
    };
}
```

## Default options
**Default options**
```javascript
{
  isExpandable: node.children.some((child) => {
    return !child.__filtered && child.__visible;
  }),
  virtualScrolling: {
    useVirtualScrolling: false,
    minItemSize: 0,
  },
  nodeEvaluators: [],
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

## Example with custom options
```html
<template>
  <div id="app">
    <performant-vue-tree :trees="treeData" :options="options" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import performantTree from 'performant-vue-tree'

export default Vue.extend({
  name: 'App',
  components: {
    performantTree
  },
  data () {
    return {
        treeData: [
            {
                id: 'root1',
                children: []
            }
        ],
        options: {
            matchTermEvaluator: {
                enabled: false;
            };
            virtualScrolling: {
                useVirtualScrolling: true,
                minItemSize: 17.5,
            },
        }
    },
  },
})
</script>
```