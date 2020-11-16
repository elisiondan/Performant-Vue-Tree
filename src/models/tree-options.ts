import { INodeEvaluator } from '@/services/tree-traversal-service';
import ITreeNode from '@/models/tree-node';
import isExpandableNode from '@/functions/tree/is-expandable-node';

type ITreeOptions = Partial<{
    /* Whether node can be expanded or is a leaf node */
    isExpandable (node: ITreeNode): boolean;
    /* Virtual scrolling is crucial when using large number of nodes */
    virtualScrolling: Partial<{
        useVirtualScrolling: boolean;
        /* When enabled, you have to define the minimal node's height.
           Does not matter if some are bigger */
        minItemSize: number;
    }>;
    /* Node evaluators executed during tree traversal. See TBD */
    nodeEvaluators: INodeEvaluator[];
    /* Search by node name utility */
    matchTermEvaluator: Partial<{
        enabled: boolean;
        /* Classname appended to nodes that match the search term */
        highlightClass: string;
    }>;
    /* Varisous visual options of the tree */
    visual: Partial<{
        /* Show icons for folders (i.e. nodes for which isExpandle is true) */
        showIconForFolders: boolean;
        /* Show left dotted line for folder's content */
        showFolderBorders: boolean;
    }>;
}>;

export default ITreeOptions;

export type IFullTreeOptions = Required<ITreeOptions>;

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
};
