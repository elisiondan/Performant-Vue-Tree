# Usage
The tree component accepts two composite props - data (required) and options (optional).

## Data prop
The `data` prop conforms to the following interface. 
<!-- If you use Typescript, you can reference it directly through  -->

<!-- TBD: Export interfaces properly
`import ITreeData from 'vue-performant-tree/src/models/tree-data`. -->

```javascript
type ITreeData = ITreeNode[];
```

```javascript
interface ITreeNode {
    id: string | number;
    name?: string;
    children: ITreeNode[];
}
```

## Minimal example
The code below will generate a tree with a single node (root) and uses its id as name.

```html
<template>
  <div id="app">
    <performant-vue-tree :trees="treeData" />
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
        ]
    }
  },
})
</script>
```