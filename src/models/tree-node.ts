interface INodeObject {
    id: string | number;
}

export default interface ITreeNode {
    obj: INodeObject;
    children: ITreeNode[];
}
