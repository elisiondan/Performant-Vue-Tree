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
    virtualScrolling: {
        useVirtualScrolling: boolean;
        minItemSize: number;
    };
    nodeEvaluators: INodeEvaluator[];
    matchTermEvaluator: {
        enabled: boolean;
        highlightClass: string;
    };
    visual: {
        showIconForFolders?: boolean;
        showFolderBorders?: boolean;
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
    minItemSize: 17.5,
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
