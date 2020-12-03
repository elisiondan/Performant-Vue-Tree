import ITreeNode from '@/models/tree-node';
import { INodeEvaluator } from '@/models/node-evaluator';

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends Function ? T[P] : RecursivePartial<T[P]>;
};

export type IFullTreeOptions = {
    isExpandable (node: ITreeNode): boolean;
    /* Getter for node children, is awaited.
     * Useful when you need to retreive children asynchronously */
    getChildren (node: ITreeNode): ITreeNode[] | Promise<ITreeNode[]>;
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
