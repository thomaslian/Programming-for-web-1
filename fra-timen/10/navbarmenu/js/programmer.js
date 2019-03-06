fetch('programmer.html')    // Hent innhold fra programmer.html
.then(res=>res.text())      // Hent som text
.then(html=> {
  // Legg inn i elementet med id=programmer (section tag)
  document.getElementById('programmer').innerHTML = html;
});
