document.querySelector('button').addEventListener('click', e=>{
  const form = e.target.form;
  emner.leggTilEmne(form.code.value, form.name.value);
  form.code.value = '';   // Nullstill verdier
  form.name.value = '';
  form.code.focus();      // Sett focus der det mest sannsynlig hører hjemme
})
