
let today = document.querySelector('.today');

let dato = new Date();

today.innerHTML = dato.getDate() + "." + (dato.getMonth()+1) + "." + dato.getFullYear();
