import { INodeEvaluator } from '@/services/tree-traversal-service';
import ITreeNode from '@/models/tree-node';
import isExpandableNode from '@/functions/tree/is-expandable-node';

type ITreeOptions = Partial<{
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
}>;

export default ITreeOptions;

export type IFullTreeOptions = Required<ITreeOptions>;

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
};
