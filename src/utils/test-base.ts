import {
  shallowMount, createLocalVue, mount, VueClass, ThisTypedShallowMountOptions,
  ThisTypedMountOptions,
} from '@vue/test-utils';

const localVue = createLocalVue();

export const shallowMountWithMocks = (
  component: VueClass<Vue>,
  options: ThisTypedShallowMountOptions<Vue> = {},
) => shallowMount(component, {
  localVue,
  mocks: {
    $t: (key: string) => key,
    $tc: (key: string) => key,
  },
  ...options,
});

export const mountWithMocks = (
  component: VueClass<Vue>,
  options: ThisTypedMountOptions<Vue> = {},
) => mount(component, {
  localVue,
  mocks: {
    $t: (key: string) => key,
    $tc: (key: string) => key,
  },
  ...options,
});
