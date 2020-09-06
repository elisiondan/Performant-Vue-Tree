export default interface FiNodeBase {
    /** Volitelný název uzlu. * */
    nazev: string;
    /** Volitelný anglický název uzlu. * */
    nazev_en: string;
    /** Volitelný popis uzlu. * */
    popis: string;
    /** Zkratka, ze které se tvoří url. Buď zadaná ručně,
     * nebo automaticky použité číslo uzlu v databázi ISu. * */
    zkratka: number;
    /** Volitelně zadané číslo, které po použije pro řazení
     * poduzlů ve výpisech Správce souborů. * */
    vaha_pro_razeni: number;
    /** Volitelné datum, kdy má být soubor smazán. U některých
     *  agend nelze použít, u některých agend povinné. * */
    expiruje: string;
    /** Datum a čas poslední změny uzlu. * */
    zmeneno: string;
    /** Učo osoby, která údaje uzlu naposledy změnila. * */
    zmenil_uco: number;
    /** Jméno osoby, která údaje uzlu naposledy změnila. * */
    zmenil_jmeno: string;
    /** =1, pokud jsou přístupová práva pro čtení
     * obsahu uzlu nastavena tak, že smí číst celý svět. * */
    smi_cist_svet: 0 | 1;
    /** =1, pokud jsou přístupová práva pro čtení
     * obsahu uzlu nastavena tak, že smí číst všichni přihlášení v ISu. * */
    smi_cist_auth: 0 | 1;
    /** Identifikační číslo uzlu v databázi ISu. * */
    uzel_id: number;
    /** Identifikační číslo uzlu rodiče (tj. uzlu nadřazené složky) v databázi ISu. * */
    rodic_id: number;
    /** Obsahuje cestu ke složce nebo k souboru uzlu. Lze použít pro vytvoření url složky nebo souboru přidáním potřebného prefixu, např. https://is.muni.cz nebo https://is.muni.cz/auth. * */
    cesta: string;
    /** Obsahuje počet objektů uzlu, tj.
     * formátů souborů (obsahuje-li např. Word, PDF a txt, pak je =3). * */
    pocet_objektu: number;
    /** Obsahuje počet poduzlů uzlu, tzn. kolik je pod uzelzavěšeno podsložek
     * nebo "podsouborů". Pro stanovení tohoto čísla se ignorují přístupová práva.  */
    pocet_poduzlu: number;
    /** URL tohoto API s parametrem zajišťujícím získání metadat tohoto uzlu. * */
    url_metadata: string;
}
