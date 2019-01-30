fetch('js/NTNU_studies.json')
.then(res=>res.json())
.then(data=>{
    let ul = document.createElement("UL");
    let section = document.querySelector("section");

    data.forEach(element => {

        
        let li = document.createElement("LI");
        let a = document.createElement("A");
        let span = document.createElement("span");
        a.innerHTML = element.name;
        a.setAttribute("href", "http://ntnu.no" + element.url)
        li.appendChild(a);
        span.innerHTML = " (" + element.studyLevelName + ": " + element.locationspretty + ")";
        li.appendChild(span);

        ul.appendChild(li);
    });
    ul.classList.add("studies");
    section.appendChild(ul);
  });