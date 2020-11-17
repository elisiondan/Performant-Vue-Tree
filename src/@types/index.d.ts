import Vue from 'vue';
import VueWait from 'vue-wait';

// VeeValidate
declare module 'vue/types/vue' {
  // Vuetify form validation options
  // Accessible on v-form through this.$refs.<formName>
  interface Vue {
    validate?: any;
    reset?: any;
    resetValidation: any;
  }
}

// Vue-wait
declare module 'vue/types/vue' {
  // Global properties can be declared
  // on the `VueConstructor` interface
  interface VueConstructor {
    $wait: VueWait;
  }
  interface Vue {
    $wait: VueWait;
    emitTreeEvent: (name: string, args?: unknown) => void;
  }
}

// ComponentOptions is declared in types/options.d.ts
declare module 'vue/types/options.d' {

  interface ComponentOptions<V extends Vue> {
    wait?: VueWait;
  }
}

// Add browser attributes to jest (node.js)
declare global {
  namespace NodeJS {
    interface Global {
       document: Document;
       window: Window;
       navigator: Navigator;
    }
  }
}
