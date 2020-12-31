import isExpandableNode from '@/functions/tree/is-expandable-node';
import getNodeChildren from '@/functions/tree/get-node-children';
import { IFullTreeOptions } from '@/models/tree-options';

const defaultOptions: IFullTreeOptions = {
  isExpandable: isExpandableNode,
  getChildren: getNodeChildren,
  virtualScrolling: {
    useVirtualScrolling: false,
    itemSize: 0,
    enableVariableSize: false,
    vueVirtualScrollerOptions: {
      buffer: 1000,
      direction: 'vertical',
      sizeField: 'size',
      typeField: 'type',
      pageMode: false,
      prerender: 0,
      emitUpdate: false,
      keyField: 'id',
    },
  },
  nodeEvaluators: [],
  matchTermEvaluator: {
    enabled: true,
    highlightClass: 'bg-yellow-400',
  },
  visual: {
    showIconForFolders: true,
    showFolderBorders: true,
    useTreeVisibilityToggle: true,
  },
  i18n: {
    show_all: 'Show all',
    term_search: 'Search',
    select_root: 'Select root',
  },
};

export default defaultOptions;
