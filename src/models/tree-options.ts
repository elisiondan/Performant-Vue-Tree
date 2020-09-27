import { INodeEvaluator } from '@/services/tree-traversal-service';
import ITreeNode from '@/models/tree-node';
import isExpandableNode from '@/functions/is-expandable-node';
import MatchTermEvaluator from '@/services/node-evaluators/match-term-evaluator';

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

export const defaultOptions: IFullTreeOptions = {
  isExpandable: isExpandableNode,
  nodeEvaluators: [MatchTermEvaluator],
  searchEvaluator: {
    enabled: true,
    highlightClass: 'bg-yellow-400',
    debounceDelay: 100,
  },
  visual: {
    showIconForFolders: true,
    showFolderBorders: true,
  },
};
