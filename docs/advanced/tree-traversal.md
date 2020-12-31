# Tree traversal
As outlined in [node evaluators](/advanced/node-evaluators) section, you can register custom functions that are evaluated during tree traversal. There are some events that trigger the traversal internally, for instance when you search for a term when enabled in [options](/guide/options).

However, you can trigger the traversal by yourself. For this you'd use `treeObserver` instance that is installed to the Vue's prototype.


```javascript
// within any method in the script part of your component
this.$treeObserver.notify({ ... })
```

The `treeObserver` provides following methods
- `subscribe (id: string | number, callback: (payload: any) => void)`

Subscribe to events emitted by the observer and perform an action

- `notify(payload: any)`

Fire an event and pass the payload to all subscribers.


As you can see, it follows a standard observer pattern. So in theory, you can subscribe your custom functions as well. This can be useful when you need to log some events or store them in Vuex for instance.

However, it's likely you'll mostly need `notify` method only. The tree component is subscribed to the _treeObserver_ instance and with each event the whole tree is traversed, modified and then re-rendered. The traversal is performed in the background thread with usage of web workers, so the operation is very efficient. During the traversal, each node is handled by all the [node evaluators](/advanced/node-evaluators) available.

## Example

To put it to work, we simply need to trigger an event and define appropriate payload argument so we target the right node evaluators.

```javascript
methods: {
    expandAll() {
        this.$treeObserver.notify({
            expandAll: true,
        });
    },
    ...
}
```

We defined an `expandAllEvaluator` in [node evaluators](/advanced/node-evaluators) section which expects _expandAll_ attribute. You can use this `expandAll` method anywhere in you app. When triggered, each node that contains children will be expanded.

