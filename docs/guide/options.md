# Options
The options prop is optional if you would like to override some of the default options. 
<!-- Again, if you use Typescript, you may import the interface directly: `import ITreeOptions from 'vue-performant-tree/src/models/tree-options`. -->


```javascript
{
    /* Whether node can be expanded or is a leaf node */
    isExpandable (node: ITreeNode): boolean;
    /* Getter for node children, is awaited.
     * Useful when you need to retreive children asynchronously */
    getChildren (node: ITreeNode): ITreeNode[] | Promise<ITreeNode[]>;
    /* Virtual scrolling is crucial when using large number of nodes */
    virtualScrolling: {
        useVirtualScrolling: boolean;
        /* When enabled, you have to define the node's height.
           If variable size mode is enabled, provide minimal height of each item.
           Does not matter if some are bigger */
        itemSize: number;
        /* When enabled, each item can have variable height.
           May have impact on performance */
        enableVariableSize: boolean;
        /** Refer to @link https://github.com/Akryum/vue-virtual-scroller for available options.
         * You should not define here 'items', 'itemSize' and 'minItemSize'
         */
        vueVirtualScrollerOptions: object;
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
        /* When enabled, there is utility to hide and show the tree */
        useTreeVisibilityToggle: boolean;
    };
    i18n: {
        show_all: string;
        term_search: string;
        select_root: string;
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
  getChildren: (node) => node.children;,
 virtualScrolling: {
    useVirtualScrolling: false,
    itemSize: 0,
    enableVariableSize: false,
    vueVirtualScrollerOptions: {
      buffer: 1000,
      direction: 'vertical',
      sizeField: 'size',
      typeField: 'type',
      pageMode: false,
      prerender: 0,
      emitUpdate: false,
      keyField: 'id',
    },
  },
  nodeEvaluators: [],
  matchTermEvaluator: {
    enabled: true,
    highlightClass: 'bg-yellow-400',
  },
  visual: {
    showIconForFolders: true,
    showFolderBorders: true,
    useTreeVisibilityToggle: true,
  },
  i18n: {
    show_all: 'Show all',
    term_search: 'Search',
    select_root: 'Select root',
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