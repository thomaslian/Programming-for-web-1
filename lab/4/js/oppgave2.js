let plussForm = document.querySelector("form");
plussForm.addEventListener('input', e=> {
    let input = parseInt(document.querySelector("input[name=pluss]").value);
    let input2 = parseInt(document.querySelector("input[name=pluss2]").value);
    let output = document.querySelector("#pluss-output");

    output.innerHTML = input + input2;
});

let dropdownForm = document.querySelector("#dropdown");
dropdownForm.addEventListener('input', e=> {
    let input = parseInt(document.querySelector("#dropdown input[name=pluss]").value);
    let input2 = parseInt(document.querySelector("#dropdown input[name=pluss2]").value);
    let output = document.querySelector("#dropdown div");
    let select = document.querySelector("select").value;

    console.log(select);
    if (select == "pluss"){
        output.innerHTML = input +  input2;
    } else if (select == "minus") {
        output.innerHTML = input -  input2;
    } else if (select == "gange") {
        output.innerHTML = input *  input2;
    } else if (select == "dele") {
        output.innerHTML = input /  input2;
    }

    
});

let prosentAvForm = document.querySelector("#prosentav");
prosentAvForm.addEventListener('input', e=> {
    let input = parseInt(document.querySelector("#prosentav input[name=pluss]").value);
    let input2 = parseInt(document.querySelector("#prosentav input[name=pluss2]").value);
    let output = document.querySelector("#prosentav div");

    output.innerHTML = input/100 * input2;
});

let rabattForm = document.querySelector("#rabatt");
rabattForm.addEventListener('input', e=> {
    let input = parseInt(document.querySelector("#rabatt input[name=pluss]").value);
    let input2 = parseInt(document.querySelector("#rabatt input[name=pluss2]").value);
    let output = document.querySelector("#rabatt div");

    output.innerHTML = input * (1 - input2/100);
});

let avForm = document.querySelector("#av");
avForm.addEventListener('input', e=> {
    let input = parseInt(document.querySelector("#av input[name=pluss]").value);
    let input2 = parseInt(document.querySelector("#av input[name=pluss2]").value);
    let output = document.querySelector("#av div");

    output.innerHTML = input / input2 * 100;
});

let erForm = document.querySelector("#er");
erForm.addEventListener('input', e=> {
    let input = parseInt(document.querySelector("#er input[name=pluss]").value);
    let input2 = parseInt(document.querySelector("#er input[name=pluss2]").value);
    let output = document.querySelector("#er div");

    output.innerHTML = input * 100 / input2;
});