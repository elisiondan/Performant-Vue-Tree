import { INodeState } from '@/enums/node-state';

interface AddedProperties {
    /** either 'open' or 'closed' * */
    __state?: INodeState;
    /** true when node is currently visible * */
    __visible?: boolean;
    /** true when node has been filtered out * */
    __filtered?: boolean;
    /** true some descendant matched the search term * */
    __leadsToMatched?: boolean;
    /** true when node itself matched the search term * */
    __matched?: boolean;
    /** node nested depth. Root starts at 0 * */
    __depth?: number;
    /** Order of the node in a flattened representation of the trees */
    __index?: number;
}

export default interface ITreeNode {
    id: string | number;
    name?: string;
    children: ITreeNode[];
}

export interface IProcessedTreeNode extends AddedProperties, ITreeNode {
    children: IProcessedTreeNode[];
}
