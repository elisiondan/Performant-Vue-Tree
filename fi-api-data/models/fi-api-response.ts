import { FiNodeWrapper } from './fi-node';
import FiTree from './fi-tree';

export default interface FiApiResponse {
    '@_verze': number;
    strom: FiTree[];
    uzly: FiNodeWrapper[];
}
