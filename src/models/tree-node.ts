import { INodeState } from '@/enums/node-state';

interface AddedProperties {
    __state?: INodeState;
    __visible?: boolean;
    __filtered?: boolean;
    __leadsToMatched?: boolean;
    __matched?: boolean;
    __depth?: number;
}

export default interface ITreeNode {
    id: string | number;
    name?: string;
    children: ITreeNode[];
}

export interface IProcessedTreeNode extends AddedProperties, ITreeNode {
    children: IProcessedTreeNode[];
}
