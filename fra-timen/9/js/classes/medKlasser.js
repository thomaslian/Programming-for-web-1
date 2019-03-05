/**
 * Objekter av denne klassen brukes for å lagre personer 
 */

class Person {
    /**
     * Oppretter en ny person, tar i mot fornavn, etternavn og alder.
     * Når en ny person opprettes må alltid denne informasjonen finnes.
     * 
     * @param {String} fornavn      Fornavnet til personen 
     * @param {String} etternavn    Etternavnet til personen
     * @param {Int} alder           Alderen til personen
     */
    constructor(fornavn, etternavn, alder) {
        this._fornavn = fornavn;
        this._etternavn = etternavn;
        this._alder = alder*1;
    }

    /**
     * 
     * @return {String} fornavnet til personen
     */
    get fornavn()  {
        return this._fornavn;
    }

    /**
     * 
     * @param {String} fornavn nytt fornavn for personen
     */
    set fornavn(fornavn) {
        this._fornavn = fornavn;
    }

    set alder(alder) {
        this._alder = alder;
    }

    /**
     * Returnerer en String som bruker fornavnet og etternavnet til personen.
     * Navnet brukes i sammenheng med "sier hei", slik at for eksempel "Navn Navnesen sier hei"
     * 
     * @return {String} fornavn og etternavn sier hei
     */
    sierHei() {
        return `${this._fornavn} ${this._etternavn} sier hei`;
    }
}