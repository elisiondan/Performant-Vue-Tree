import { INodeEvaluator } from '@/services/tree-traversal-service';
import ITreeNode from './tree-node';

type ITreeOptions = Partial<{
    isExpandable (node: ITreeNode): boolean;
    nodeEvaluators: INodeEvaluator[];
    searchEvaluator: {
        enabled: boolean;
        highlightClass: 'bg-yellow-400';
        debounceDelay: 100;
    };
    visual: {
        showIconForFolders?: boolean;
        showFolderBorders?: boolean;
    };
}>;

export default ITreeOptions;

export type IFullTreeOptions = Required<ITreeOptions>;
