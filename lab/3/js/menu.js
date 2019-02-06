fetch('js/menu.json')
  .then(res=>res.json())
  .then(data=>{
    let menu = document.querySelector('nav ul');
    data.forEach((menuItem, idx)=>{
      let li = document.createElement('li');
      let active = '';
      if (idx==page) {
        active = ' class="active"';
        document.querySelector('section h1').innerHTML = menuItem.subject;
        document.querySelector('head title').innerHTML = menuItem.subject;
      }
      li.innerHTML = `<a href=${menuItem.href}${active}>${menuItem.html}</a>`;
      menu.appendChild(li);
    })
  });
