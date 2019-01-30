HTMLCollection.prototype.forEach = Array.prototype.forEach;

document.getElementById('liste').addEventListener('change', e=>{
    console.log(e);
    e.target.selectedOptions.forEach(element => {
        console.log (element.value, element.innerHTML);
    });
    console.log(e.target.selectedOptions[0].value);
});