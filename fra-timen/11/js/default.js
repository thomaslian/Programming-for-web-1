window.addEventListener('load', e=>{
  // Legge til et nytt objekt i en "store"
  document.querySelector('.add').addEventListener('click', e=>{
    var formData = new FormData();
    formData.append('store', 'oeivindk_test');
    formData.append('data', JSON.stringify({info:"TEST"}));
    fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/add.php', {
      method: "POST",
      body: formData
    })
  })

  // Endre innhold i et element i en "store"
  document.querySelector('.set').addEventListener('click', e=>{
    var formData = new FormData();
    formData.append('store', 'oeivindk_test');
    formData.append('idx', 0);
    formData.append('data', JSON.stringify({info:"TESTING"}));
    fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/set.php', {
      method: "POST",
      body: formData
    })
  })

  // Fjerne en hel store
  document.querySelector('.remove').addEventListener('click', e=>{
    var formData = new FormData();
    formData.append('store', 'oeivindk_test');
    fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/remove.php', {
      method: "POST",
      body: formData
    })
  })
})
