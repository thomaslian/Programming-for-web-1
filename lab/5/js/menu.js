fetch('js/menu.json')                           // Hent menyen fra js/menu.json
  .then(res=>res.json())                        // Gjør om til JSON
  .then(data=>{
    let menu = document.querySelector('nav ul');// Hent referanse til menyen
    data.forEach((menuItem, idx)=>{             // Gå gjennom alle menyelemtene i JSON dataene
      let li = document.createElement('li');    // Lag nytt menyelement
      let active = '';
      if (idx==page) {                          // Dersom det er aktiv forside
        active = ' class="active"';
        // document.querySelector('section h1').innerHTML = menuItem.subject;
        document.querySelector('head title').innerHTML = menuItem.subject;
      }
      // Legg til linken som innerHTML i menyelementet
      li.innerHTML = `<a data-id-type="${menuItem.id}" data-scriptsrc="${menuItem.js}" href=${menuItem.href}${active}>${menuItem.html}</a>`;
      menu.appendChild(li);                     // Legg til menyelementet i menyen

    })

    let link = document.querySelectorAll('nav > ul a');

    link.forEach(item=> {
      item.addEventListener('click', e=> {
        e.preventDefault();

        // Først håndterer vi lasting av script
        if (e.target.dataset.scriptsrc!="") {   // Dersom det er et javascript koblet til denne "siden"
        // Sjekker om JavaScriptet allerede er lastet inn (NB, i forelesningen brukte jeg "'" istedenfor "`", da vil det alltid returneres null, og skriptet blir alltid lastet på nytt)
        if (document.querySelector(`[src="${e.target.dataset.scriptsrc}"]`)==null) {
        let script = document.createElement('SCRIPT');  // Skriptet er ikke lastet, lag en script tag
        script.src = e.target.dataset.scriptsrc;        // Legg inn src til scriptet
        document.querySelector('head').appendChild(script); // Legger script taggen i hodet (kan også legges i body)
      }
    }

        document.querySelectorAll("body>section>section").forEach(section => {
          if (e.target.dataset.idType == section.id) {
            section.classList.add("active");
          } else {
            section.classList.remove("active");
          }
        })

        document.querySelectorAll("nav a").forEach(menuItem => {
          if (menuItem == e.target) {
            menuItem.classList.add("active");
          } else {
            menuItem.classList.remove("active");
          }
        })

      });
    });
  });

 
