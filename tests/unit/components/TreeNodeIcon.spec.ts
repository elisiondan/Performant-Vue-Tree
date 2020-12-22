import TreeNodeIcon from '@/components/TreeNodeIcon.vue';
import defaultOptions from '@/defaults/default-tree-options';
import { shallowMountWithMocks } from '../test-base';
import root from '../fixtures/root';

describe('TreeNodeIcon.vue', () => {
  it('should show folder for expandable node', async () => {
    defaultOptions.isExpandable = () => true;

    const wrapper = shallowMountWithMocks(TreeNodeIcon, {
      propsData: {
        node: root(),
        options: defaultOptions,
      },
    });
    expect(wrapper.html()).toContain('folder');
  });

  it('should show file for non-expandable node', async () => {
    defaultOptions.isExpandable = () => false;
    const wrapper = shallowMountWithMocks(TreeNodeIcon, {
      propsData: {
        node: root(),
        options: defaultOptions,
      },
    });
    expect(wrapper.html()).toContain('file');
  });
});
