// JSON - JavaScript Object Notation
let json = '{ "egenskap1" : "verdi", "egenskap2" : "verdi 2"}'
let objekt = JSON.parse(json);
console.log(objekt);

json = `{
    "navn" : "Thomas Lian Ødegaard",
    "stilling" : "Student",
    "adresse" : {
        "gate" : "langata",
        "nr" : 23,
        "postnr" : "0001"
    },
    "emner" : [
        {
            "emnekode" : "imt1441",
            "emnenavn" : "Programmering for web I"
        },
        {
            "emnekode" : "imt2291",
            "emnenavn" : "WWW-teknologi"
        }
    ],
    "emner2" : [
        "imt1441",
        "imt2291"
    ]
}`;

objekt = JSON.parse(json);
console.log(objekt);



fetch('3.json')
.then(res=>res.json())
.then(objekt=>{
    console.log(objekt);
    let body = document.querySelector('body');
    let div = document.createElement('DIV');
    body.appendChild(div);
    div.innerHTML = `<h2>${objekt.navn}</h2>`;
    let ul = document.createElement('UL');
    div.appendChild(ul);
    objekt.emner.forEach(emne=>{
        let li = document.createElement('LI');
        li.innerHTML = `${emne.emnekode}: ${emne.emnenavn}`;
        ul.appendChild(li);
    });
});


objekt.emner.array.forEach(element => {
    console.log(element.emnekode, element.emnenavn)
});