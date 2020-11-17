# Custom node properties
In [basic usage](/guide/basic-usage.html) was outlined what properties each node in the tree must contain. 
However, you are free to define as many custom properties as you want. Since you may want to access nodes in various scenarios, for example through [scoped slots](/guide/slots) or through [tree traversal](/guide/tree-traversal), it can be beneficial to do so.

For instance, imagine that you would like to define a custom icon for nodes. You could define the icon name at initialization and then resolve it through scoped slots. It might be a good practive to prefix your custom properties, an underscore is a safe bet for instance.

```javascript
// data definition
treeData: [
        {
            id: 'root1',
            name: 'Root,
            _icon: 'folder.svg'
            children: [{
                id: 'child1',
                name: 'Child',
                _icon: 'file.svg',
                children: []
            }],
        }
    ]
}
```

```html
// In template usage
<performant-vue-tree :data="treeData">
    <template #nodeContent="nodeData">
        <img :src=`/icons/${nodeData._icon}` />
        {{ nodeData.name }}
    </template>
</performant-vue-tree>
```