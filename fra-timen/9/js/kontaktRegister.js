document.querySelector('button').addEventListener ('click', e => {
    const kontakt = new Kontakt(e.target.form.fornavn.value, 
                                e.target.form.etternavn.value, 
                                e.target.form.tlf.value, 
                                e.target.form.epost.value);

    if (e.target.form.idx.value=="") {
        kontakter.push(kontakt);
    } else {
        kontakter [e.target.form.idx.value*1] = kontakt;
        e.target.form.idx.value = "";
    }
    
    visKontakter();
});

function visKontakter() {
    const kontaktListe = document.querySelector('ul.kontakter');
    kontaktListe.innerHTML = '';
    kontakter.forEach((kontakt, idx) => {
        const li = document.createElement('LI');
        li.innerHTML = kontakt;
        li.setAttribute('data.idx', idx);
        kontaktListe.appendChild(li);
    });
}

const kontaktListe = document.querySelector('ul.kontakter');
kontaktListe.addEventListener('click', e => {
    console.log(e);

    const kontakt = kontakter[e.target.dataset.idx];
    const form = document.querySelector('form');
    form.idx.value = e.target.dataset.idx;
    form.fornavn.value = kontakt.fornavn;
    form.etternavn.value = kontakt.etternavn;
    form.tlf.value = kontakt.tlf;
    form.epost.value = kontakt.epost;
})