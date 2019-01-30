let section = document.querySelector('section');

fetch('js/people.json')
  .then(res=>res.json())
  .then(data=>{
    data.forEach(person=>{

        //Div
        let div = document.createElement('DIV');
        div.style.border = "1px solid black";
        div.style.padding = "5px";
        div.style.marginBottom = "5px";

        //Navn
        let p = document.createElement('P');
        p.innerHTML = "Navn: " + person.name.first + " " + person.name.last;
        if (person.isActive) {
            p.style.color = "green";
        } else {
            p.style.fontWeight = "bold";
        }

        //Firma
        let firma = document.createElement('P');
        firma.innerHTML = "Firma: " + person.company;

        //Alder
        let alder = document.createElement('P');
        alder.innerHTML = "Alder: " + person.age;

        //Penger
        let penger = document.createElement('P');
        penger.innerHTML = "Balanse: " + person.balance;

        section.appendChild(div);
        div.appendChild(p);
        div.appendChild(firma);
        div.appendChild(alder);
        div.appendChild(penger);
      });
  });

