import TreeComplements from '@/components/TreeComplements.vue';
import defaultOptions from '@/defaults/default-tree-options';
import { cloneDeep } from 'lodash';
import { shallowMountWithMocks, mountWithMocks } from '../test-base';
import root from '../fixtures/root';

describe('TreeComplements.vue', () => {
  let options = defaultOptions;
  beforeEach(() => {
    options = cloneDeep(defaultOptions);
  });

  it('should show search input when enabled', async () => {
    const wrapper = shallowMountWithMocks(TreeComplements, {
      propsData: {
        roots: [root()],
        options,
      },
    });
    expect(wrapper.find('[data-test="tree-complements-search"]').exists()).toBeTruthy();
  });

  it('should not show search input when disabled', async () => {
    options.matchTermEvaluator.enabled = false;
    const wrapper = shallowMountWithMocks(TreeComplements, {
      propsData: {
        roots: [root()],
        options,
      },
    });
    expect(wrapper.find('[data-test="tree-complements-search"]').exists()).toBeFalsy();
  });

  it('should always provide select all roots option first', async () => {
    options.matchTermEvaluator.enabled = false;
    const wrapper = mountWithMocks(TreeComplements, {
      propsData: {
        roots: [root()],
        options,
      },
    });
    expect(wrapper.find('[data-test="pvt-select-option"]').html()).toContain(options.i18n.show_all);
  });

  it('should provide select root option for each root', async () => {
    options.matchTermEvaluator.enabled = false;
    const wrapper = mountWithMocks(TreeComplements, {
      propsData: {
        roots: [root()],
        options,
      },
    });
    expect(wrapper.findAll('[data-test="pvt-select-option"]').at(1).html()).toContain(root().name);
  });
});
