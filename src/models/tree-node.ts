import NodeState from '@/enums/node-state';

interface AddedProperties {
    __state: NodeState;
    __visible: boolean;
    __filtered: boolean;
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
