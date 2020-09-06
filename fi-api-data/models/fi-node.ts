import FiNodeBase from './fi-node-base';
import FiSubNode from './fi-subnode';

interface FiSubNodes {
    poduzly: {
        poduzel: FiSubNode[];
    };
}

export default interface FiNode extends FiNodeBase {
    poduzly: FiSubNodes;
}
