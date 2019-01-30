fetch('js/pizzaToppings.json')
.then(res=>res.json())
.then(toppings=>{
    console.log(toppings);
    let valg = document.getElementById('valg');
    let idTeller = 1;
    toppings.forEach(type => {
        let details = document.createElement('DETAILS');
        details.innerHTML = `<summary>${type.kategori}</summary>`;
        valg.appendChild(details);
        type.valg.forEach(topping=>{
            let sjekkboks = document.createElement('INPUT');
            sjekkboks.type = "checkbox";
            sjekkboks.name = topping;
            sjekkboks.value = topping;
            sjekkboks.id = `topping${idTeller}`;
            details.appendChild(sjekkboks);
            let label = document.createElement('LABEL');
            label.innerHTML = topping;
            label.setAttribute('for', `topping${idTeller}`);
            details.appendChild(label);
            details.appendChild(document.createElement('BR'));
            idTeller++;
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', e =>{
            console.log(e);
            let pizza = document.querySelector('.pizza');
            pizza.innerHTML = "<h2>Topping på pizzaen din</h2>";
            document.querySelectorAll('input[type="checkbox"]:checked').forEach(topping => {
                pizza.innerHTML = pizza.innerHTML + topping.value+"<br>";
            });
        });
    });
});
