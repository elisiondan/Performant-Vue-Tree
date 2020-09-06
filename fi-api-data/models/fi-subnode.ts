import FiNodeBase from './fi-node-base';

interface FiBinder {
    id: number;
}

export default interface FiSubnode extends FiNodeBase {
    '@_poradi_poduzlu': number;
    poradac: FiBinder;
}
