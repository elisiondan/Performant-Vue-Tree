export default interface FiFolder {
    /** Cesta ke složce. * */
    '@_url': string;
    /** Identifikace uzlu se složkou uložená v databázi ISu. * */
    '@_uzel_id': number;
    /** Identifikace uzlu rodičovské (nadřazené) složky v databázi ISu. * */
    '@_rodic_id': number;
    /** Pomocný údaj popisující úroveň zanoření aktuální složky
     * vzhledem ke složce adresované parametrem url. * */
    '@_zanoreni': number;
    /** Orientační údaj použitý pro vyhodnocení velikosti složky. Zahrnuje
     * počet uzlů a souborů ve složce a podsložkách spočítaný bez ohledu na přístupová práva. * */
    '@_polozek_v_podstromu'?: number;
    /** Popis a příklad použití elementu obsah_slozky_ignoruji_ctete_metadata vizte níže. * */
    obsah_slozky_ignoruji_ctete_metadata?: string;
    slozka?: FiFolder[];
}
