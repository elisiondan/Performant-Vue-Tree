# Installation

## Compatibility Note

- Vue.js `2.0.0`+

## Direct Download / CDN
You may include performant-vue-tree directly via script tags.

```html    
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
```

## NPM
    
```sh
npm install performant-vue-tree
``` 

Then the underlying worker script has to be copied to the public path. To do so, run following script
```sh
node node_modules/performant-vue-tree/dist/init-worker.js 
```

Then you can either register the component globally 

```javascript
// global plugin
import Vue from 'vue'
import performantVueTree from 'vue-performant-tree'

Vue.use(performantVueTree)
```

or import it separately where needed 
```html
<script>
import Vue from 'vue'
import performantVueTree from 'vue-performant-tree'

export default Vue.extend({
    components: { performantVueTree }
    ...
})
</script>
```