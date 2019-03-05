/**
 * Objekter av denne klassen brukes for å lagre kontakter i et kontaktregister.
 */
class Kontakt {
  /**
   * Oppretter en ny kontakt, tar i mot fornavn, etternavn, tlf og epost.
   * Når en ny kontakt opprettes må alltid denne informasjonen finnes.
   *
   * @param {String} fornavn   Fornavnet til kontakten
   * @param {String} etternavn Etternavnet til kontakten
   * @param {String} tlf       Telefonnummeret til kontakten
   * @param {String} epost     Epost adressen til kontakten
   */
  constructor(fornavn, etternavn, tlf, epost) {
    this._fornavn = fornavn;
    this._etternavn = etternavn;
    this._tlf = tlf;
    this._epost = epost;
  }

  /**
   * Brukt for å endre fornavn til denne kontakten.
   *
   * @param  {String} fornavn nytt fornavn på kontakten
   */
  set fornavn (fornavn) {
    this._fornavn = fornavn;
  }

  /**
   * Brukt for å endre etternavn til denne kontakten.
   *
   * @param  {String} etternavn nytt etternavn på kontakten
   */
  set etternavn (etternavn) {
    this._etternavn = etternavn;
  }

  /**
   * Brukt for å endre telefonnummer til denne kontakten.
   *
   * @param  {String} tlf nytt telefonnummer til kontakten
   */
  set tlf (tlf) {
    this._tlf = tlf;  // Sjekk at telefonnummer
  }

  /**
   * Brukt for å endre epost adresse til denne kontakten.
   *
   * @param  {String} epost ny epost adresse til kontakten
   * @return {[type]}       [description]
   */
  set epost (epost) {
    this._epost = epost;  // Sjekk at epost
  }

  /**
   * Henter fornavnet til kontakten
   *
   * @return {String} fornavnet til kontakten
   */
  get fornavn () {
    return this._fornavn;
  }

  /**
   * Henter etternavnet til kontakten
   *
   * @return {String} etternavnet til kontakten
   */
  get etternavn () {
    return this._etternavn;
  }

  /**
   * Henter telefonnummeret til kontakten
   *
   * @return {String} telefonnummeret til kontakten
   */
  get tlf () {
    return this._tlf;
  }

  /**
   * Henter epost adressen til kontakten
   *
   * @return {String} epost adressen til kontakten
   */
  get epost () {
    return this._epost;
  }

  /**
   * Returnerer en String som beskriver innholdet i objektet.
   * Inneholder fornavn etternavn - tlf - Epost
   * 
   * @return {String} fornavn etternavn - tlf - epost til kontakten
   */
  toString () {
    return `${this.fornavn} ${this.etternavn} - ${this.tlf} - ${this.epost}`;
  }
}
