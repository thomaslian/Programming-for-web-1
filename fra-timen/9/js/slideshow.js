const kittens = ["img/682px-Kitten_in_Rizal_Park,_Manila.jpg",
                 "img/9343-a-cute-orange-kitten-isolated-on-a-white-background-pv.jpg",
                 "img/kittens-2641211_960_720.jpg",
                 "img/kittens-2677249_960_720.jpg"];

const slideshow = document.querySelector('.slideshow');
const slide1 = document.createElement('DIV');
slideshow.appendChild(slide1);
const slide2 = document.createElement('DIV');
slideshow.appendChild(slide2);
slide1.style.backgroundImage = `url('${kittens[0]}')`;

setTimeout(()=>{
  slide1.style.opacity = 1;
}, 1);                          // Etter 1 ms, fade inn det bakerste bilder
/*
setTimeout(()=>{
  slide2.style.backgroundImage = slide1.style.backgroundImage;
  slide2.style.opacity = 1;
}, 7000);                     // Etter 7 sekunder, legg samme bilde i det fremste som det bakerste, fade inn det fremste


slide2.addEventListener('transitionend', e=>{
  if (slide2.style.backgroundImage==slide1.style.backgroundImage) { // Når det fremste bildet er fadet inn
    slide1.style.backgroundImage = `url('${kittens[1]}')`;          // Bytt det bakerste bildet
    slide2.style.opacity = 0;                                       // Fade ut det fremste bildet (dvs, vis bildet bak)
  }
})
*/

let currentSlide = 1;   // Hva er det neste bildet som skal vises
nextSlide();            // Starter slideshower

/**
 * Venter 7 sekunder før de to bildene settes til samme bildet og
 * slide2 vises frem. Når slide2 er helt synlig vil neste bilde vises frem.
 */
function nextSlide() {
  setTimeout(()=>{
    slide2.style.backgroundImage = slide1.style.backgroundImage;
    slide2.style.opacity = 1;
  }, 7000); // Etter 7 sekunder, legg samme bilde i det fremste som det bakerste, fade inn det fremste
}

slide2.addEventListener('transitionend', e=>{ // Når slide to er helt synlig/usynlig
  if (slide2.style.backgroundImage==slide1.style.backgroundImage) { // Når det fremste bildet er fadet inn
    slide1.style.backgroundImage = `url('${kittens[currentSlide]}')`;// Bytt det bakerste bildet
    slide2.style.opacity = 0;                                       // Fade ut det fremste bildet (dvs, vis bildet bak)
    currentSlide++;     // Gå til neste bilde
    currentSlide = currentSlide%kittens.length; // Dersom forbi slutten, gå til begynnelsen
    nextSlide();        // Etter syv sekunder, gjør klar for å bytte bildet igjen
  }
})
