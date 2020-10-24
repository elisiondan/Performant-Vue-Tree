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
    __parentId?: string | number;
}

interface INodeObject {
    id: string | number;
    name?: string;
}

export default interface ITreeNode {
    obj: INodeObject;
    children: ITreeNode[];
}

export interface IProcessedTreeNode extends AddedProperties, ITreeNode {
    children: IProcessedTreeNode[];
}
