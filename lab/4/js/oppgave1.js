fetch('lorum-ipsum.html')
.then(res=>res.text())
.then(text=>{
  // Din kode her
    let div = document.createElement('DIV');
    div.innerHTML = text;
    let section = document.querySelector('section');
    section.appendChild(div);

    let x = document.querySelector("#vindu header div");
    let vindu = document.querySelector('#vindu');
    x.addEventListener('click', e=>{
        vindu.style.display = "none";
        console.log("x");
        e.stopPropagation()
    });

    let body = document.querySelector('body');
    
    body.addEventListener('click', e=> {
        vindu.style.display = "block";
        console.log("body");
    });

    let html = document.querySelector('html');
    window.addEventListener('scroll', e=> {
        vindu.style.top = html.scrollTop + "px";
        console.log(html.scrollTop);
    });
});

