/**
 * Et objekt av denne klassen bruker for å organisere en handleliste.
 * Handlelisten lagres på server : http://folk.ntnu.no/oeivindk/imt1441/storage/
 * i to "stores", selve handelisten i "oeivindk_handleliste" og en liste over
 * varer som noen gang har vært i handlelisten ligger i "oeivindk_vareliste".
 *
 * Tre ulike unummererte lister benyttes, en for å vise varer som skal handles,
 * en som viser varer som er handlet (denne kan tømmes) og en viser en oversikt
 * over varer som noensinne er handlet (kan ikke tømmes).
 * Listene oppdateres hver gang en vare legges til i handlelisten (også når
 * en vare er handlet).
 *
 * I tillegg til konstruktoren er det kun tre metoder som en trenger å benytte
 * for å bruke handlelisten, leggTilVare for å legge en vare i handlelisten,
 * handlet, for å flytte en vare fra handlelisten til listen over varer som er handlet
 * og fjernAlleHandlet for å tømme listen med varer som er handlet.
 * I tillegg er det en get metode for å hente en samling med alle varer som noen
 * gang er handlet, denne samlingen kan brukes for å søke i varer som er handlet
 * tidligere.
 */
class HandleListe {
  /**
   * Henter handlelisten og oversikten over varer som er handlet fra serveren.
   * Fyller inn handlelisten og listen med varer som er handlet. Fyller også inn
   * listen med varer som noen gang er handlet.
   *
   * @param {String} handleSelektor    CSS selektor til listen som skal inneholde handlelisten
   * @param {String} handletSelektor   CSS selektor til listen som skal inneholde listen over varer som er handlet
   * @param {String} varelisteSelektor CSS selektor til listen som skal inneholde oversikten over varer som noen gang er handlet
   */
  constructor (handleSelektor, handletSelektor, varelisteSelektor) {
    this._handle = document.querySelector(handleSelektor);
    this._handlet = document.querySelector(handletSelektor);
    this._velgVare = document.querySelector(varelisteSelektor);
    this._storeURL = 'http://folk.ntnu.no/oeivindk/imt1441/storage/';
    this._handleListeID = 'oeivindk_handleliste';
    this._vareListeID = 'oeivindk_vareliste';
    this._hentHandleliste();
    this._hentVarer();
  }

  /**
   * Henter samlingen med alle varer som noensinne er handlet.
   *
   * @return {Array} samlingen med varer som noensinne har vært i handlelisten.
   */
  get varer() {
    return this._vareliste;
  }

  /**
   * Legg til en vare i handlelisten, dersom varen finnes i handlelisten så
   * blir antallet av varen økt med 1.
   * Dersom varen finnes i listen over handlede varer så flyttes den til listen
   * for varer som skal handles og eventuelt antall blir nullstilt til 1.
   * Dersom varen ikke har blitt handlet tidligere så blir den lagt til i listen
   * over varer som noensinne har blitt handlet.
   *
   * @param  {String} vare navnet på varen som skal legges til.
   */
  leggTilVare(vare) {
    this._fjernFraHandlet(vare);  // Dersom varen finnes i listen over handlede varer så vil den bli fjernet derfra
    if (this._vareliste.map(v=>v.navn).indexOf(vare)==-1) { // Varen har aldri vært i handlelisten tidligere
      this._vareliste.push({navn: vare});                   // Legg til i listen over varer som noensinne har blitt handlet (lokalt)
      this._leggTilVarelisteServer(vare);                  // Legg også i listen over varer som noensinne har blitt handlet på serveren
    }
    // Finnes denne varen allerede i handlelisten?
    const idx = this._handleliste.filter(v=>!v.handlet).map(v=>v.vare).indexOf(vare);
    if (idx==-1) {                      // Hvis ikke
      const handle = {                  // Opprett et nytt objekt
        vare: vare,                     // Med navnet på varen
        antall: 1,                      // antall satt til 1
        handlet: false                  // varen er ikke handlet
      }
      this._handleliste.push(handle);   // Legg til lokalt
      this._oppdaterServer(handle);     // og på serveren
    } else {                            // Vare finnes i handlelisten
      this._handleliste[idx].antall++;  // Øk antall med 1 (lokalt)
      this._oppdaterServer(this._handleliste[idx], idx);  // og lagre endringer på serveren
    }
    this._oppdaterHandleListe();        // Vis listen over varer som skal kjøpes og som er kjøpt på nytt
  }

  /**
   * Når en vare er handlet settes et flagg på denne varen for å indiktere at den er kjøpt.
   * Dette gjør at den visuelt flyttes fra handlelisten over i listen over varer som er handlet.
   *
   * @param  {String} vare navnet på varen som er kjøpt
   */
  handlet(vare) {
    const idx = this._handleliste.map(v=>v.vare).indexOf(vare);
    if (idx>-1) {   // Sjekker av varen faktisk finnes i handlelisten
      this._handleliste[idx].handlet = true;    // Setter flag for å indikere at varen er kjøpt (lokalt)
      this._oppdaterServer(this._handleliste[idx], idx);  // Oppdaterer informasjon på serveren
    }
    this._oppdaterHandleListe();      // Vis listen over varer som skal kjøpes og som er kjøpt på nytt
  }

  /**
   * Fjerner alle varer som er flagget som kjøpt fra listen.
   * Viser listen på nytt slik at brukeren ser at listen med kjøpte varer forsvinner.
   */
  fjernAlleHandlet() {
    const handlet = this._handleliste.filter(v=>v.handlet); // Lager en samlingen med varene som er kjøpt
    handlet.forEach(vare=>{   // Går gjennom samlingen med varer som er kjøpt
      const idx = this._handleliste.indexOf(vare);
      this._handleliste.splice(idx, 1); // Fjerner varen lokalt
      // Fjerner varen fra serveren
      fetch(`${this._storeURL}remove.php?store=${this._handleListeID}&idx=${idx}`);
    })
    this._oppdaterHandleListe();     // Vis listen over varer som skal kjøpes og som er kjøpt på nytt
  }

  /**
   * Henter handlelisten fra serveren.
   * Oppdaterer de unummererte listene som viser handlelisten og listen over
   * varer som er kjøpt slik at brukeren får vist det som ligger på serveren.
   */
  _hentHandleliste() {
    fetch(`${this._storeURL}getAll.php?store=${this._handleListeID}`)
    .then(res=>res.json())
    .then(data=>{
      if (data.status=="SUCCESS") {       // Data ble returner riktig
        if (data.data!=null) {            // data er != null
          this._handleliste = data.data;  // Sett returnerte data som handlelisten
        } else {
          this._handleliste = [];         // Dersom noe er feil, bruk en tom handleliste
        }
      } else {
        this._handleliste = [];
      }
      this._oppdaterHandleListe();        // Vis listen over varer som skal kjøpes og som er kjøpt på nytt
    })
  }

  /**
   * Henter listen over varer som noensinne er kjøpt fra serveren.
   * Oppdaterer den unummererte listen som viser varer som noensinne er kjøpt
   * slik at brukeren enkelt kan velge blant disse varene når brukeren skal legge
   * til nye varer i handlelisten.
   */
  _hentVarer() {
    fetch(`${this._storeURL}getAll.php?store=${this._vareListeID}`)
    .then(res=>res.json())
    .then(data=>{
      if (data.status=="SUCCESS") {     // Data ble hentet riktig
        if (data.data!=null) {          // Data er != null
          this._vareliste = data.data;  // Bruk data som listen over varer som noensinne er kjøpt
        } else {
          this._vareliste = [];         // Dersom noe er feil, bruk en tom liste
        }
      } else {
        this._vareliste = [];
      }
      this._oppdaterValgListe();        // Oppdater den unummererte listen over varer som noensinne er kjøpt
    })
  }

  /**
   * Fjerner en vare med gitt navn fra handlelisten. Varen må være flagget som kjøpt
   * for at den skal bli fjernet fra handlelisten.
   *
   * @param  {String} vare navnet på varen som skal fjernes
   * @return {[type]}      [description]
   */
  _fjernFraHandlet(vare) {
    // Finner posisjonen til varen blant varer som er handlet
    let idx = this._handleliste.filter(v=>v.handlet).map(v=>v.vare).indexOf(vare);
    if (idx!=-1) {    // Denne vare er kjøpt, kan fjernes
      // Finner posisjonen i den ufiltrerte samlingen
      idx = this._handleliste.map(v=>v.vare).indexOf(vare);
      this._handleliste.splice(idx, 1); // Fjerner den fra den lokale listen

      // Koden under tar høyde for at vi kanskje fjerner mange varer etter hverandre.
      const request = async () => {     // Må vente på svar på denne, før den neste sendes.
        const response = await fetch(`${this._storeURL}remove.php?store=${this._handleListeID}&idx=${idx}`);
      };
      request();                      // fetch returnerer umidelbart, denne metoden venter til fetch har fått svar.
    }
  }

  /**
   * Legger till en ny vare eller oppdaterer en vare i handlelisten på serveren.
   * Dersom idx sendes med og er != null så oppdateres varen med denne indeksen på serveren,
   * hvis ikke så legges en ny vare til på serveren.
   *
   * @param  {Object} handle     et objekt som inneholder navn, antall og et flagg som forteller om varen er handlet eller ikke.
   * @param  {number} [idx=null] for å legge til en ny vare utelates denne parameteren, for å oppdatere en vare så settes den lik indeksen til den vare som skal oppdateres.
   */
  _oppdaterServer(handle, idx=null) {
    var formData = new FormData();
    formData.append('store', this._handleListeID);
    formData.append('data', JSON.stringify(handle));
    if (idx==null) {  //  idx ikke satt, legg til vare
      fetch(`${this._storeURL}add.php`, {   // Bruk add.php for å legge til
        method: "POST",
        body: formData
      })
    } else {  // idx satt, oppdater vare
      formData.append('idx', idx);
      fetch(`${this._storeURL}set.php`, {   // Bruk set.php for å oppdatere
        method: "POST",
        body: formData
      })
    }
  }

  /**
   * Legg til vare i listen på serveren over alle varer som noensinne er handlet.
   *
   * @param  {String} vare navnet på varen som skal legges til
   */
  _leggTilVarelisteServer(vare) {
    var formData = new FormData();
    formData.append('store', this._vareListeID);  // Bruk riktig store ID
    formData.append('data', JSON.stringify({navn:vare}));
    fetch(`${this._storeURL}add.php`, {
      method: "POST",
      body: formData
    })
    this._oppdaterValgListe();  // Oppdater den unummererte listen som viser varer som noensinne er handlet.
  }

  /**
   * Oppdaterer den unummererte listen som viser varer som noensinne er handlet.
   * Dette oppdaterer altså det visuelle som brukeren ser.
   */
  _oppdaterValgListe() {
    this._velgVare.innerHTML = '';            // Fjern alt innhold fra listen
    this._vareliste.forEach(vare=>{           // Gå gjennom samlingen med varer som noensinne er handlet
      const li = document.createElement('LI');// Lag listeelement, sett inn navnet på varen og legg i listen
      li.innerHTML = vare.navn;
      this._velgVare.appendChild(li);
    })
  }

  /**
   * Oppdaterer de to unummererte listene som viser varer i handlelisten
   * og varer som ligger i listen over varer som er kjøpt.
   * Dette oppdaterer altså det visuelle som brukeren ser.
   */
  _oppdaterHandleListe() {
    this._handle.innerHTML = '';      // Tøm begge listene
    this._handlet.innerHTML = '';
    this._handleliste.forEach(vare=>{ // Gå gjennom hele handlelisten
      const li = document.createElement('LI');
      li.innerHTML = vare.vare;       // Lag LI og sett navn på varen
      if (vare.antall>1) {            // Dersom mer enn 1 vare med dette navnet skal kjøpes
        li.innerHTML += `(${vare.antall})`; // Vis antall i parantes
      }
      li.setAttribute('data-vare', vare.vare);  // Sett navnet som data-vare attributt
      if (vare.handlet) {             // Dersom varen er handlet
        this._handlet.appendChild(li);// vis i listen for kjøpte varer
      } else {                        // hvis ikke (varen skal kjøpes)
        this._handle.appendChild(li); // vis i handlelisten
      }
    })
  }
}
