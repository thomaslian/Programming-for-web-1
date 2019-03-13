// Venter med å legge på event lytte rutiner til hele dokumentet er lastet inn.
window.addEventListener('load', e=>{
  const handleListe = new HandleListe('.handleliste ul', '.handlet ul', '.nyVare ul');

  // Bruker trykker "Legg til vare..." i handlelisten
  document.querySelector('.handleliste .leggTil').addEventListener('click', e=>{
    document.querySelector('.nyVare').style.display = 'block';  // Vis dialog
    document.getElementById('nyvarenavn').focus();              // Fokus på input
    document.getElementById('nyvarenavn').select();             // Velg all tekst i input feltet
  })

  // Bruker trykker X (lukk) i toppen av dialogvinduet
  document.querySelector('.nyVare header>div').addEventListener('click', e=>{
    document.querySelector('.nyVare').style.display = 'none';   // Skjul dialogen
  })

  // Brukeren skriver tekst i varenavn input feltet (i dialogen)
  document.getElementById('nyvarenavn').addEventListener('input', e=>{
    const vareVelger = document.querySelector('.nyVare .nyvareliste');
    vareVelger.innerHTML = '';                    // Tøm listen med varer
    handleListe.varer.filter(vare=>               // Filtrer varer, vis kun de som passer med det som er skrevet
      vare.navn.indexOf(e.target.value)>-1).forEach(vare=>{
        const li = document.createElement('LI');  // Legg til de varene som passer med søket
        li.innerHTML = vare.navn;
        vareVelger.appendChild(li);
    })
  })

  // Brukeren trykker "Lukk" knappen i dialogen
  document.querySelector('.nyVare .lukk').addEventListener('click', e=>{
    document.querySelector('.nyVare').style.display = 'none';   // Skjul dialogen
  })

  // Brukeren trykker på knappen "Legg til" i dialogen.
  // Denne vil også trigges dersom brukeren trykker enter i input feltet
  document.querySelector('.nyVare .leggTil').addEventListener('click', e=>{
    handleListe.leggTilVare(e.target.form.nyvarenavn.value);    // Legg til en stykk av varen i handlelisten
    document.getElementById('nyvarenavn').focus();              // Fokuser på input feltet
    document.getElementById('nyvarenavn').select();             // Velg all teksten i input feltet
  })

  // Brukeren trykker på en av varene i listen i dialogen
  document.querySelector('.nyVare .nyvareliste').addEventListener('click', e=>{
    if (e.target.tagName=='LI') {                       // Forsikrer oss om at brukeren trykket på en vare, ikke bare på listen
      handleListe.leggTilVare(e.target.innerHTML);      // Legg til et stykk av varen brukeren trykket på i handlelisten
      document.getElementById('nyvarenavn').focus();    // Fokus på input feltet
      document.getElementById('nyvarenavn').select();   // Velg all teksten i input feltet
    }
  })

  // Brukeren trykket på en vare i handlelisten (varen er kjøpt)
  document.querySelector('.handleliste ul').addEventListener('click', e=>{
    if (e.target.tagName=='LI') {   // Sjekk at vi faktisk trykket på en vare
      handleListe.handlet(e.target.dataset.vare); // Flytt varen fra "Handle" til "Handlet"
    }
  })

  // Brukeren trykket på en vare i listen over "har handlet"
  document.querySelector('.handlet ul').addEventListener('click', e=>{
    if (e.target.tagName=='LI') {   // Sjekk at vi faktisk trykket på en vare
      handleListe.leggTilVare(e.target.dataset.vare); // Flytt varen fra "Handlet" til "Handle" (dersom flere av varen, sett til 1)
    }
  })

  // Brukeren trykket på "Slett alle handlede varer"
  document.querySelector('.handlet .slettHandlet').addEventListener('click', e=>{
    handleListe.fjernAlleHandlet(); // Fjern all varer fra "Har handlet" listen
  })
})  // Slutt på window load event håndteringen
