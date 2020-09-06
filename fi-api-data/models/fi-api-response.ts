import FiNode from './fi-node';
import FiTree from './fi-tree';

export default interface FiApiResponse {
    '@_verze': number;
    strom: FiTree;
    uzly: {
        uzel: FiNode;
    };
}
