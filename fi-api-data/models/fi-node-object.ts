export default interface FiNodeObject {
    '@_poradi_objektu': number;
    jmeno_souboru: string;
    mime_type: string;
    velikost: number;
    vlozeno: string;
    vlozil_uco: number;
    vlozil_jmeno: string;
    objekt_id: number;
    cesta: string;
}

export interface FiNodeObjectWrapper {
    objekt: FiNodeObject[];
}
