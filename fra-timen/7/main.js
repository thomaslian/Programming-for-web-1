function leggSammen(tall1, tall2) {
    return tall1+tall2;
}

let sum = leggSammen(1, 2);

function qsa(selector){
    return document.querySelectorAll(selector);
}

qsa('h1')[0].innerHTML = "Mye kortere nå";

removeElement('p>span');

function removeElement(selector){
    let element = qsa(selector)[0];
    if (element!=null) {
        let parent = element.parentElement;
        parent.removeChild(element);
    }
}

function visValg(checkbox) {
    let valgt = '';
    if (!checkbox.checked) {
        valgt = "ikke ";
    }
    qsa('.visValg')[0].innerHTML = `Checkbox ${checkbox.value} er ${valgt} valgt`;
}

qsa ('[type="checkbox"]')[0].addEventListener('click', vis);

qsa ('[type="checkbox"]')[1].addEventListener('click', vis);

qsa ('[type="checkbox"]')[2].addEventListener('click', e=>{
    visValg(e.target);
})

function vis(hendelse){
    visValg(hendelse.target);
}

function endreParameter(input){
    input = 20;
}

let input = 10;
endreParameter(input);
console.log(input);

input = { tall : 20 };

function endreParameter1(input){
    input.tall = 10;
}

endreParameter1(input);
console.log(input.tall);

let tallene = [10, 20, 30];

function endreParameter2(input){
    input[0] = 20;
}

endreParameter2(tallene);
console.log(tallene);

function endreParameter3(tallene){
    input = [0,0];
}

endreParameter3(tallene);
console.log(tallene);

var tall = 10;

if (tall<100) {
    let x = "sant";
    var y = "sant";
}


function summer(a,b) {
    var summen = a+b;
    let summen1 = a+b;
}

summer(1,2);

const PI = 3.14159;
const MVA = 25;

const div = document.createElement("DIV");
div.innerHTML = "Hei på alle";
document.body.appendChild(div);