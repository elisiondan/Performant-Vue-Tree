import { shallowMount } from '@vue/test-utils';
import PvtClarityIcon from '@/components/support/PvtClarityIcon.vue';

const shallowMountIconFactory = (options: object) => shallowMount(PvtClarityIcon, {
  ...options,
  stubs: {
    'clr-icon': {
      template: '<div class="clr-icon"></div>',
    },
  },
});

describe('PvtClarityIcon.vue', () => {
  it('should pass correct size', () => {
    const wrapper = shallowMountIconFactory({
      propsData: {
        name: 'success',
        size: 32,
      },
    });
    expect(wrapper.find('.clr-icon').attributes().size).toBe('32');
  });

  it('should use name prop', () => {
    const wrapper = shallowMountIconFactory({
      propsData: {
        name: 'test',
      },
    });
    expect(wrapper.find('.clr-icon').attributes().shape).toBe('test');
  });
});
