import _Vue, { PluginFunction, VueConstructor } from 'vue';
import '@/assets/css/main.css';
import treeObserver from '@/services/tree-observer';

// Import vue component
import component from '@/components/Tree.vue';

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
interface InstallableComponent extends VueConstructor<_Vue> {
  install: InstallFunction;
}

// install function executed by Vue.use()
const install: InstallFunction = function installPerformantVueTree(Vue: typeof _Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('PerformantVueTree', component);
  Vue.prototype.$treeObserver = treeObserver;
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if (process.env.ES_BUILD === 'false') {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GlobalVue = (global as any).Vue;
  }
  if (GlobalVue) {
    (GlobalVue as typeof _Vue).use(plugin);
  }
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(component as any as InstallableComponent).install = install;

// Export component by default
export default component;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
