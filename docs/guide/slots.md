# Slots
You may expand or modify appearance of the tree component through available slots.

## nodeContent
This slot replaces default node icon and its label. When set **nodePrependLabel** and **nodeLabel** have no effect.
You have access to the given node through scoped data.

```html
<performant-vue-tree :data="treeData">
    <template #nodeContent="{nodeData}">
        ....
    </template>
</performant-vue-tree>
```

## nodePrependLabel
An area in front of the node label (name if available, id otherwise)
You have access to given node through scoped data.

```html
<performant-vue-tree :data="treeData">
    <template #nodePrependLabel="{nodeData}">
        ....
    </template>
</performant-vue-tree>
```

## nodeLabel
Replaces default node's label (name if available, id otherwise)
You have access to given node through scoped data.

```html
<performant-vue-tree :data="treeData">
    <template #nodeLabel="{nodeData}">
        ....
    </template>
</performant-vue-tree>
```

## nodeIcon
Replaces default node's icon
You have access to given node through scoped data.

```html
<performant-vue-tree :data="treeData">
    <template #nodeIcon="{nodeData}">
        ....
    </template>
</performant-vue-tree>
```

## expandedBeforeChevron
The area on the left side of the collapse chevron while expanded.
```html
<performant-vue-tree :data="treeData">
    <template #expandedBeforeChevron>
        ....
    </template>
</performant-vue-tree>
```

## loading
Replace the default loading animation when traversing the tree

```html
<performant-vue-tree :data="treeData">
    <template #loading>
        ....
    </template>
</performant-vue-tree>
```