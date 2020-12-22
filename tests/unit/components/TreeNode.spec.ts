import TreeNode from '@/components/TreeNode.vue';
import defaultOptions from '@/defaults/default-tree-options';
import { cloneDeep } from 'lodash';
import { mountWithMocks } from '../test-base';
import root from '../fixtures/root';

describe('TreeNode.vue', () => {
  let options = defaultOptions;
  beforeEach(() => {
    options = cloneDeep(defaultOptions);
  });

  describe('virtual scroller enabled', () => {
    beforeEach(() => {
      options.virtualScrolling.useVirtualScrolling = true;
    });

    it('should render only node without children with virtual scrolling enabled', async () => {
      const wrapper = mountWithMocks(TreeNode, {
        propsData: {
          node: root(),
          options,
        },
      });
      expect(wrapper.findAll('[data-test="tree-node"]').length).toBe(1);
    });

    it('should use nodeContent slot when provided', () => {
      const rootNode = root();
      const wrapper = mountWithMocks(TreeNode, {
        propsData: {
          node: rootNode,
          options,
        },
        scopedSlots: {
          nodeContent: '<div data-test="scoped-slot">{{props}}</div>',
        },
      });

      expect(wrapper.find('[data-test="scoped-slot"]').exists()).toBeTruthy();
    });

    it('should use nodePrependLabel slot when provided', () => {
      const rootNode = root();
      const wrapper = mountWithMocks(TreeNode, {
        propsData: {
          node: rootNode,
          options,
        },
        scopedSlots: {
          nodePrependLabel: '<div data-test="scoped-slot">{{props}}</div>',
        },
      });

      expect(wrapper.find('[data-test="scoped-slot"]').exists()).toBeTruthy();
    });

    it('should use nodeLabel slot when provided', () => {
      const rootNode = root();
      const wrapper = mountWithMocks(TreeNode, {
        propsData: {
          node: rootNode,
          options,
        },
        scopedSlots: {
          nodeLabel: '<div data-test="scoped-slot">{{props}}</div>',
        },
      });

      expect(wrapper.find('[data-test="scoped-slot"]').exists()).toBeTruthy();
    });
  });

  describe('virtual scroller disabled', () => {
    beforeEach(() => {
      options.virtualScrolling.useVirtualScrolling = false;
    });

    it('should render node with children with virtual scrolling disabled', async () => {
      options.virtualScrolling.useVirtualScrolling = false;
      const rootNode = root();
      rootNode.__state = 'open';
      rootNode.children = rootNode.children.map((c) => {
        c.__visible = true;
        return c;
      });
      const wrapper = mountWithMocks(TreeNode, {
        propsData: {
          node: rootNode,
          options,
        },
      });
      expect(wrapper.findAll('[data-test="tree-node"]').length).toBe(2);
    });

    it('should use nodeContent slot when provided', () => {
      const rootNode = root();
      const wrapper = mountWithMocks(TreeNode, {
        propsData: {
          node: rootNode,
          options,
        },
        scopedSlots: {
          nodeContent: '<div data-test="scoped-slot">{{props}}</div>',
        },
      });

      expect(wrapper.find('[data-test="scoped-slot"]').exists()).toBeTruthy();
    });

    it('should use nodePrependLabel slot when provided', () => {
      const rootNode = root();
      const wrapper = mountWithMocks(TreeNode, {
        propsData: {
          node: rootNode,
          options,
        },
        scopedSlots: {
          nodePrependLabel: '<div data-test="scoped-slot">{{props}}</div>',
        },
      });

      expect(wrapper.find('[data-test="scoped-slot"]').exists()).toBeTruthy();
    });

    it('should use nodeLabel slot when provided', () => {
      const rootNode = root();
      const wrapper = mountWithMocks(TreeNode, {
        propsData: {
          node: rootNode,
          options,
        },
        scopedSlots: {
          nodeLabel: '<div data-test="scoped-slot">{{props}}</div>',
        },
      });

      expect(wrapper.find('[data-test="scoped-slot"]').exists()).toBeTruthy();
    });
  });
});
