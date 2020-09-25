import { INodeEvaluator } from '@/services/tree-traversal-service';
import ITreeNode from './tree-node';

type ITreeOptions = Partial<{
    isExpandable (node: ITreeNode): boolean;
    nodeEvaluators: INodeEvaluator[];
    visual: {
        showIconForFolders?: boolean;
        showFolderBorders?: boolean;
    };
}>;

export default ITreeOptions;

export type IFullTreeOptions = Required<ITreeOptions>;
