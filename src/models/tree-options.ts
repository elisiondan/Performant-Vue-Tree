import { INodeEvaluator } from '@/services/tree-traversal-service';
import ITreeNode from '@/models/tree-node';
import isExpandableNode from '@/functions/tree/is-expandable-node';

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends Function ? T[P] : RecursivePartial<T[P]>;
};

export type IFullTreeOptions = {
    isExpandable (node: ITreeNode): boolean;
    /* Virtual scrolling is crucial when using large number of nodes */
    virtualScrolling: {
        useVirtualScrolling: boolean;
        /* When enabled, you have to define the node's height.
           If variable size mode is enabled, provide minimal height of each item.
           Does not matter if some are bigger */
        itemSize: number;
        /* When enabled, each item can have variable height.
           May have impact on performance */
        enableVariableSize: boolean;
        /** Refer to @link https://github.com/Akryum/vue-virtual-scroller for available options.
         * You should not define here 'items', 'itemSize' and 'minItemSize'
         */
        vueVirtualScrollerOptions: object;
    };
    /* Node evaluators executed during tree traversal. See TBD */
    nodeEvaluators: INodeEvaluator[];
    /* Search by node name utility */
    matchTermEvaluator: {
        enabled: boolean;
        /* Classname appended to nodes that match the search term */
        highlightClass: string;
    };
    visual: {
        showIconForFolders: boolean;
        showFolderBorders: boolean;
    };
    i18n: {
        show_all: string;
    };
};

type ITreeOptions = RecursivePartial<IFullTreeOptions>;
export default ITreeOptions;

export const defaultOptions: IFullTreeOptions = {
  isExpandable: isExpandableNode,
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
  },
  i18n: {
    show_all: 'Zobrazit vše',
  },
};
