let favoritt = localStorage.getItem('favoritt');
console.log(favoritt);

window.addEventListener('load', e => {
    oppdaterFavoritt(favoritt);
    document.querySelector('select').addEventListener('change', e => {
        let favoritt = e.target.selectedOptions[0].innerHTML;
        console.log(favoritt);
        localStorage.setItem('favoritt', favoritt);
        oppdaterFavoritt(favoritt);
    });

    document.querySelector('.removeFavourite').addEventListener('click', e => {
        localStorage.removeItem('favoritt');
    })

    document.querySelector('.clear').addEventListener('click', e => {
        localStorage.clear();
    })
});

function oppdaterFavoritt(favoritt) {
    if (favoritt != null) {
        document.querySelector('p.favourite').innerHTML = `Du foretrekker ${favoritt}`;
    } else {
        document.querySelector('p.favourite').innerHTML = 'Du har ikke valgt favoritt.'
    }
}