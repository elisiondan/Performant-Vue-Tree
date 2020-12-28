import {
  shallowMount, createLocalVue, mount, VueClass, ThisTypedShallowMountOptions,
  ThisTypedMountOptions,
} from '@vue/test-utils';

const transitionStub = () => ({
  // @ts-ignore
  render(h) { // eslint-disable-line
  // @ts-ignore
    return this.$options._renderChildren;
  },
});

const localVue = createLocalVue();

export const shallowMountWithMocks = (
  component: VueClass<Vue>,
  options: ThisTypedShallowMountOptions<Vue> = {},
) => shallowMount(component, {
  localVue,
  stubs: {
    'clr-icon': {
      template: '<div class="clr-icon"></div>',
    },
    transition: transitionStub(),
  },
  mocks: {
    $t: (key: string) => key,
    $tc: (key: string) => key,
  },
  provide: {
    emitTreeEvent: () => {},
  },
  ...options,
});

export const mountWithMocks = (
  component: VueClass<Vue>,
  options: ThisTypedMountOptions<Vue> = {},
) => mount(component, {
  localVue,
  stubs: {
    'clr-icon': {
      template: '<div class="clr-icon"></div>',
    },
    transition: transitionStub(),
  },
  mocks: {
    $t: (key: string) => key,
    $tc: (key: string) => key,
  },
  provide: {
    emitTreeEvent: () => {},
  },
  ...options,
});
