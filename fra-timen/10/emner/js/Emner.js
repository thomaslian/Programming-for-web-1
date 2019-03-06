/**
 * Objekt av denne klassen brukes for å holde informasjon om emner for en
 * student/ansatt. Oversikt over emner hentes fra localStorage (emner) i
 * konstruktoren og nye emner legges til ved å kalle metoden leggTilEmne.
 */
class Emner {
  /**
   * Konstruktoren tar i mot en selektor som henviser til en unummerert liste.
   * Eksisterende emner hentes fra localStorage og lagres i egenskapen "emner".
   * Oversikt over eksisterende emner vises ved å kalle metoden visEmner.
   *
   * @param {String} selector brukes for å finne den unummererte listen hvor listen med emner skal lagres.
   */
  constructor(selector) {
    this.selector = selector;
    this.emner = [];
    const json = localStorage.getItem('emner');
    if (json!=null) {
      this.emner = JSON.parse(json);
    }
    this.visEmner();
  }

  /**
   * Bruker selektor fra konstruktoren for å finne riktig unummerert liste og
   * egenskapen emner i objektet som inneholder samlingen med emner for å vise
   * en liste med emner.
   */
  visEmner() {
    const emner = document.querySelector(this.selector);  // NB, forskjell på emner og this.emner
    emner.innerHTML = '';         // Fjerner alle elementer fra den unummererte listen
    this.emner.forEach(emne=>{    // Går gjennom samlingen med emner og fyller inn i den unummererte listen
      const li = document.createElement('LI');
      li.innerHTML = `${emne.emnekode} ${emne.emnenavn}`;
      emner.appendChild(li);
    });
  }

  /**
   * Tar i mot emnekde og emnenavn og legger til nytt emne i listen over emner.
   * Legger til emnet både i dette objektet og i egenskapen "emner" i localStorage.
   *
   * @param  {String} kode emnekode for nytt emne
   * @param  {String} navn navnet til nytt emne
   */
  leggTilEmne(kode, navn) {
    const emne = {          // Opprett objekt med nytt emne
      emnekode: kode,
      emnenavn: navn
    }
    this.emner.push(emne);  // Legg til i dette objektet
    // localStorage kan kun lagre tekst, så bruk stringify for å gjøre om til tekst
    localStorage.setItem('emner', JSON.stringify(this.emner));
    this.visEmner();        // Vis listen på nytt
  }
}

const emner = new Emner('ul.emner');
