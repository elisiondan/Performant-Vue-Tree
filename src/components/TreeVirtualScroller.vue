<template>
  <div class="virtual-scroller overflow-x-auto mt-3">
    <div
      ref="wrapper"
      class="min-w-max-content"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { IProcessedTreeNode } from '@/models/tree-node';
import Vue, { PropType } from 'vue';
import treeParser from '@/services/tree-parser';
import visibleNodesEvaluator from '@/services/node-evaluators/visible-nodes-evaluator';
import { throttle } from 'lodash';
import setVirtualScrollPropsEvaluator from '@/services/node-evaluators/set-virtual-scroll-props-evaluator';

function binarySearch(nodes: IProcessedTreeNode[],
  condition: (node: IProcessedTreeNode) => boolean,
  firstIndex = 0) {
  let index = firstIndex;
  let toIndex = nodes.length - 1;

  while (index !== toIndex) {
    const midIndex = Math.floor((index + toIndex) / 2);

    if (condition(nodes[midIndex])) {
      toIndex = midIndex;
    } else if (index === midIndex) index = toIndex;
    else index = midIndex;
  }
  return index;
}

const Y_OFFSET = 45; // Extra pixels outside the viewport, in each direction, to render nodes in
const Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes

interface IData {
    lastRecalcY: number;
    renderedNodes: IProcessedTreeNode[];
}

export default Vue.extend({
  name: 'TreeVirtualScroller',
  props: {
    nodes: {
      type: Array as PropType<IProcessedTreeNode[]>,
      required: true,
    },
  },
  data(): IData {
    return {
      lastRecalcY: Number.MAX_SAFE_INTEGER,
      renderedNodes: [],
    };
  },
  watch: {
    nodes: {
      handler() {
        const { y } = (this.$refs.wrapper as Element).getBoundingClientRect();
        setVirtualScrollPropsEvaluator.startYPosition = y;
        this.recalculateNodes();
        this.handleScroll();
      },
    },
  },
  mounted() {
    // (this.$refs.wrapper as any).addEventListener('scroll', this.onScroll);
    this.$el.addEventListener('scroll', this.onScroll, { passive: true });
    const { y } = (this.$refs.wrapper as Element).getBoundingClientRect();
    setVirtualScrollPropsEvaluator.startYPosition = y;
    this.recalculateNodes();
    this.handleScroll();
    // this.recalculateNodes();
    // this.handleScroll();
  },
  beforeDestroy() {
    (this.$refs.wrapper as any).removeEventListener('scroll', this.onScroll);
  },
  methods: {
    recalculateNodes() {
      setVirtualScrollPropsEvaluator.reset();
      treeParser.traverseTreeWithoutWorker(
        [setVirtualScrollPropsEvaluator],
        {
          trees: treeParser.getCurrentTree(),
          topToBottom: true,
        },
      );
    //   this.handleScroll();
    },

    onScroll: throttle(function throttledScroll(this: any) {
      this.handleScroll();
    }, 200, { leading: false }),

    handleScroll() {
    //   this.recalculateNodes();
      visibleNodesEvaluator.reset();
      treeParser.traverseTreeWithoutWorker(
        [visibleNodesEvaluator],
        {
          trees: treeParser.getCurrentTree(),
          topToBottom: true,
        },
      );

      const { visibleNodes } = visibleNodesEvaluator;

      if (visibleNodes.length === 0) { return; }

      //   console.log(visibleNodes.map((n) => n.obj.name));
      const { height: viewportHeight } = this.$el.getBoundingClientRect();
      const { y } = (this.$refs.wrapper as Element).getBoundingClientRect();

      // If haven't scrolled enough, do not recalculate
      if (Math.abs(this.lastRecalcY - y) <= Y_EPSILON) { return; }
      this.lastRecalcY = y;
      this.renderedNodes = [];

      const firstIndex = binarySearch(
        visibleNodes,
        // eslint-disable-next-line arrow-body-style
        (node) => {
          const nodePosition = node.__yPosition || 0;
          //   if ((node.__yPosition || 0) + Y_OFFSET > viewportHeight) {
          //     return true;
          //   }
          return nodePosition <= y + Y_OFFSET;
        //   return ((node.__yPosition || 0) + Y_OFFSET < y)
        // || ((node.__yPosition || 0) + (node.__height || 0) < y);
        },
      );
      let lastIndex = binarySearch(
        visibleNodes,
        // eslint-disable-next-line arrow-body-style
        (node) => {
          console.log(y, viewportHeight, y - viewportHeight - Y_OFFSET);
          return (node.__yPosition || 0) <= y - viewportHeight - Y_OFFSET;
        }, firstIndex,
      );

      console.log(firstIndex, lastIndex);
      if (lastIndex === 0) {
        lastIndex = visibleNodes.length - 1;
      }

      for (let i = firstIndex; i <= lastIndex; i += 1) {
        visibleNodes[i].__virtualVisible = true;
      }
    //   console.log(this.renderedNodes.map((n) => n.obj.name));
    },
  },
});
</script>

<style lang="postcss" scoped>
.virtual-scroller {
    max-height: 100vh;
    overflow-y: auto;
}
</style>
