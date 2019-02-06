fetch("js/spitfire.json")
.then(res => res.json())
.then(data=>{
    let section = document.querySelector("section");
    
    //Image
    let image = document.createElement("IMG");
    image.setAttribute("src", "img/" + data.img);
    image.style.width = "100%";
    section.appendChild(image);

    //Key features
    let keyFeaturesP = document.createElement("P");
    keyFeaturesP.innerHTML = "Key features";
    section.appendChild(keyFeaturesP);

    let ul = document.createElement("UL");

    data["Key Features"].forEach(element => {
        let li = document.createElement("LI");
        li.innerHTML = element;
        ul.appendChild(li);
    });
    section.appendChild(ul);

    //Specs
    let table = document.createElement("TABLE");
    Object.keys(data.Specs).forEach(key=>{
            let tr = document.createElement("TR");
            let td1 = document.createElement("TD");
            let td2 = document.createElement("TD");
            td1.innerHTML = key;
            td2.innerHTML = data.Specs[key];
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
    });
    
 
    table.style.border = "1px solid gray";
    section.appendChild(table);

    document.querySelectorAll("tr:nth-child(even)").forEach(element=>{
        element.style.backgroundColor = "gray";
    });
    
    document.querySelectorAll("td, th").forEach(element=>{
        element.style.border = "1px solid #dddddd";
        element.style.textAlign = "left";
        element.style.padding = "8px";
    });


})