import TreeExpandArrow from '@/components/TreeExpandArrow.vue';
import defaultOptions from '@/defaults/default-tree-options';
import { shallowMountWithMocks } from '../test-base';
import root from '../fixtures/root';

describe('TreeExpandArrow.vue', () => {
  defaultOptions.isExpandable = () => true;

  it('should be directed down when expanded', async () => {
    const rootNode = root();
    rootNode.__state = 'open';
    const wrapper = shallowMountWithMocks(TreeExpandArrow, {
      propsData: {
        node: rootNode,
        options: defaultOptions,
      },
    });
    expect(wrapper.html()).toContain('down');
  });

  it('should be directed right when expanded', async () => {
    const rootNode = root();
    rootNode.__state = 'closed';
    const wrapper = shallowMountWithMocks(TreeExpandArrow, {
      propsData: {
        node: rootNode,
        options: defaultOptions,
      },
    });
    expect(wrapper.html()).toContain('right');
  });

  it('should return empty div for non-expandable nnode', async () => {
    defaultOptions.isExpandable = () => false;

    const rootNode = root();
    const wrapper = shallowMountWithMocks(TreeExpandArrow, {
      propsData: {
        node: rootNode,
        options: defaultOptions,
      },
    });
    expect(wrapper.html()).toStrictEqual('<div></div>');
  });
});
