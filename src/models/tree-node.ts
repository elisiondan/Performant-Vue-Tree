import { INodeState } from '@/enums/node-state';

interface AddedProperties {
    __state?: INodeState;
    __visible?: boolean;
    __filtered?: boolean;
    __leadsToMatched?: boolean;
    __matched?: boolean;
    __height?: number;
    __yPosition?: number;
    __nodeIndex?: number;
    __virtualVisible?: boolean;
    __depth?: number;
}

interface INodeObject {
    name?: string;
}

export default interface ITreeNode {
    id: string | number;
    obj: INodeObject;
    children: ITreeNode[];
}

export interface IProcessedTreeNode extends AddedProperties, ITreeNode {
    children: IProcessedTreeNode[];
}
