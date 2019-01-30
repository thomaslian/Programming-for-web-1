let input = document.getElementById('input');
let output = document.getElementById('output');

input.addEventListener('input', e => {
    output.innerHTML = input.value;
});

document.querySelector('[value="Til store bokstaver"]').addEventListener('click', e=>{
    console.log(e.target.form.navn);
    output.innerHTML = e.target.form.navn.value.toUpperCase();
});

document.querySelector('div.klikkHer').addEventListener('click', e=>{
    console.log("Du klikket på div taggen");
});

document.querySelector('p.klikkHer').addEventListener('click', e=>{
    console.log("Du klikket på avsnittet");
});

document.querySelector('a').addEventListener('click', e=>{
    console.log("Du klikket på linken");
    e.preventDefault();
});