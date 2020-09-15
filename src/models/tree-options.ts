import ITreeNode from './tree-node';

export default interface ITreeOptions {
    isExpandable? (node: ITreeNode): boolean;
}

export type IFullTreeOptions = Required<ITreeOptions>;
