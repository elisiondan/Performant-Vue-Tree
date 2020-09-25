import ITreeNode from './tree-node';

export default interface ITreeOptions {
    isExpandable? (node: ITreeNode): boolean;
    visual: {
        showIconForFolders?: boolean;
        showFolderBorders?: boolean;
    };
}

export type IFullTreeOptions = Required<ITreeOptions>;
