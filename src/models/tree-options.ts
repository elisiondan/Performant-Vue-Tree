import { INodeEvaluator } from '@/services/tree-traversal-service';
import ITreeNode from '@/models/tree-node';
import isExpandableNode from '@/functions/tree/is-expandable-node';

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends Function ? T[P] : RecursivePartial<T[P]>;
};

type RecursiveRequired<T> = Required<{
    [P in keyof T]: T[P] extends Function ? T[P] : Partial<T[P]>;
}>;

export type IFullTreeOptions = {
    isExpandable (node: ITreeNode): boolean;
    /* Virtual scrolling is crucial when using large number of nodes */
    virtualScrolling: {
        useVirtualScrolling: boolean;
        /* When enabled, you have to define the minimal node's height.
           Does not matter if some are bigger */
        minItemSize: number;
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
    minItemSize: 0,
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
