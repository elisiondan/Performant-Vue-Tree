import FiNodeBase from './fi-node-base';
import { FiNodeObjectWrapper } from './fi-node-object';

export interface FiNodeWrapper {
    uzel: FiBaseNode[];
}

interface FiBinder {
    id: number;
}

export interface FiSubNodeWrapper {
    poduzel: Array<FiFileNode | FiFolderNode>;
}

export default interface FiBaseNode extends FiNodeBase {
    poradac: FiBinder;
    poduzly: FiSubNodeWrapper[];
}

export interface FiFileNode extends FiNodeBase {
    '@_poradi_poduzlu': number;
    objekty: [FiNodeObjectWrapper];
}

export interface FiFolderNode extends FiNodeBase {
    nazev: string;
    '@_poradi_poduzlu': number;
    /** URL tohoto API s parametrem zajišťujícím získání metadat tohoto uzlu. * */
    url_metadata: string;
}
