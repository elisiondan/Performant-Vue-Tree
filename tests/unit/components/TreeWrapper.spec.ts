import TreeWrapper from '@/components/TreeWrapper.vue';
import defaultOptions from '@/defaults/default-tree-options';
import { cloneDeep } from 'lodash';
import { IProcessedTreeNode } from '@/models/tree-node';
import treeParser from '@/services/tree-parser';
import { shallowMountWithMocks, mountWithMocks } from '../test-base';
import root from '../fixtures/root';

jest.mock('@/services/tree-parser');

describe('TreeWrapper.vue', () => {
  let options = defaultOptions;
  let roots: IProcessedTreeNode[] = [root()];
  beforeEach(() => {
    options = cloneDeep(options);
    roots = [root()];
    roots[0].__visible = true;
  });
  describe('virtual scroll enabled', () => {
    beforeEach(() => {
      options.virtualScrolling.useVirtualScrolling = true;
      options.virtualScrolling.itemSize = 20;
    });

    it('should use virtual scroller when enabled', () => {
      const wrapper = shallowMountWithMocks(TreeWrapper, {
        propsData: {
          roots,
          options,
          treeHeight: '100px',
          isSearchActive: false,
        },
      });

      expect(wrapper.html()).toContain('tree-virtual-scroller');
    });

    it('should set height of the wrapper based on prop', () => {
      const wrapper = shallowMountWithMocks(TreeWrapper, {
        propsData: {
          roots,
          options,
          treeHeight: '100px',
          isSearchActive: false,
        },
      });
      expect(wrapper.find('[data-test="virtual-tree-wrapper"]').attributes().style).toContain('max-height: 100px');
    });

    it('should flatten the tree for virtual scroller', () => {
      roots[0].children[0].children = [{
        id: 1000, name: 'nested child', children: [], __visible: true,
      }];
      roots[0].children = roots[0].children.map((c) => ({ ...c, __visible: true }));
      const wrapper = shallowMountWithMocks(TreeWrapper, {
        propsData: {
          roots,
          options,
          treeHeight: '100px',
          isSearchActive: false,
        },
      });

      const nestedChild = wrapper.vm.$data.renderedTree
        .find((t: IProcessedTreeNode) => t.id === 1000);
      expect(nestedChild).toBeDefined();
    });

    it('should show child nodes on expand and hide on collapse', async () => {
      const wrapper = mountWithMocks(TreeWrapper, {
        propsData: {
          roots,
          options,
          treeHeight: '100px',
          isSearchActive: false,
        },
      });

      await wrapper.vm.$nextTick();
      const rootNode = wrapper.find('[data-test="virtual-tree-wrapper-node"]');
      rootNode.vm.$emit('arrow-click', roots[0]);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.findAll('[data-test="virtual-tree-wrapper-node"]').length).toBe(2);

      const traverseSpy = jest.spyOn(treeParser, 'traverseTree');
      traverseSpy.mockResolvedValueOnce([]);

      rootNode.vm.$emit('arrow-click', roots[0]);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.findAll('[data-test="virtual-tree-wrapper-node"]').length).toBe(2);
    });
  });

  describe('virtual scroll disabled', () => {
    beforeEach(() => {
      options.virtualScrolling.useVirtualScrolling = false;
    });

    it('should use normal wrapper when virtual scroller is disabled', () => {
      const wrapper = shallowMountWithMocks(TreeWrapper, {
        propsData: {
          roots,
          options,
          treeHeight: '100px',
          isSearchActive: false,
        },
      });

      expect(wrapper.html()).not.toContain('tree-virtual-scroller');
    });

    it('should ignore the height prop', () => {
      const wrapper = shallowMountWithMocks(TreeWrapper, {
        propsData: {
          roots,
          options,
          treeHeight: '100px',
          isSearchActive: false,
        },
      });
      expect(wrapper.find('[data-test="tree-wrapper"]').attributes().style).toBeUndefined();
    });

    it('should not flatten the tree for virtual scroller', () => {
      roots[0].children[0].children = [{
        id: 1000, name: 'nested child', children: [], __visible: true,
      }];
      roots[0].children = roots[0].children.map((c) => ({ ...c, __visible: true }));
      const wrapper = shallowMountWithMocks(TreeWrapper, {
        propsData: {
          roots,
          options,
          treeHeight: '100px',
          isSearchActive: false,
        },
      });

      const nestedChild = wrapper.vm.$data.renderedTree
        .find((t: IProcessedTreeNode) => t.id === 1000);
      expect(nestedChild).toBeUndefined();
    });

    it('should show child nodes on expand and hide on collapse', async () => {
      const wrapper = mountWithMocks(TreeWrapper, {
        propsData: {
          roots,
          options,
          treeHeight: '100px',
          isSearchActive: false,
        },
      });

      await wrapper.vm.$nextTick();
      const rootNode = wrapper.find('[data-test="tree-wrapper-node"]');
      rootNode.vm.$emit('arrow-click', roots[0]);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.findAll('[data-test="tree-node"]').length).toBe(1);
      expect(wrapper.findAll('[data-test="tree-wrapper-node"]').length).toBe(1);

      const traverseSpy = jest.spyOn(treeParser, 'traverseTree');
      traverseSpy.mockImplementation((_, data) => {
        if (data && data.trees) {
          data.trees.forEach((n) => { n.__visible = false; });
        }
        return new Promise((resolve) => resolve([]));
      });

      rootNode.vm.$emit('arrow-click', roots[0]);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.findAll('[data-test="tree-wrapper-node"]').length).toBe(1);
      expect(wrapper.findAll('[data-test="tree-node"]').exists()).toBeFalsy();
    });
  });
});
