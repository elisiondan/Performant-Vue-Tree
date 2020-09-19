import FiNodeBase from './fi-node-base';
import { FiSubNodeWrapper } from './fi-subnode';

export interface FiNodeWrapper {
    uzel: FiNode[];
}

export default interface FiNode extends FiNodeBase {
    poduzly: FiSubNodeWrapper[];
}
