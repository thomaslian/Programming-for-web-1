// Henter favoritt fra localStorage
let favourite = localStorage.getItem('favourite');

console.log (favourite);

window.addEventListener('load', e=>{  // Vent til hele dokumentet er lastet inn
  if (favourite!=null) {
    oppdaterFavoritt();
  } else {
    document.querySelector('p.favourite').innerHTML = 'Du har ikke valgt noen favoritt enda';
  }

  // Oppdater når brukeren velger ny favoritt
  document.querySelector('select').addEventListener('change', e=>{
    // console.log(e.target.selectedOptions[0].innerHTML);
    favourite = e.target.selectedOptions[0].innerHTML;
    localStorage.setItem('favourite', favourite);
    oppdaterFavoritt();
  })

  // Brukeren trykker på knappen fjern favoritt
  document.querySelector('.removeFavourite').addEventListener('click', e=>{
    localStorage.removeItem('favourite');
  })

  // Brukeren trykker på knappen for å fjerne alle elementer
  document.querySelector('.clear').addEventListener('click', e=>{
    localStorage.clear();
  })
});

/**
 * Oppdaterer innholdet i p.favourite ut ifra innholdet i egenskapen "favourite"
 */
function oppdaterFavoritt() {
  document.querySelector('p.favourite').innerHTML = `Du foretrekker : ${favourite}`;
}
