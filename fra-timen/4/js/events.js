//Trigges når alt på siden er lastet
window.addEventListener('load', e=>{
    let footer = document.querySelector('footer');
    console.log ("I footer står det : ", footer.innerHTML);

    let img = document.createElement('IMG');
    img.addEventListener('load', e=>{
        console.log ("Bilde er lastet inn");
        img.style.opacity = 1;
    })
    img.src = "img/spitfire.jpg";
    document.querySelector('body').appendChild(img);

    let cartoon = document.getElementById('eyes');
    cartoon.addEventListener('mousemove', e=>{
        console.log(e);
        cartoon.style.top = (e.pageY-50)+"px";
        cartoon.style.left = (e.pageX-50)+"px";
    });
});