document.querySelector('button').addEventListener('click', e => {
    const form = e.target.form;
    emner.leggTilEmne(form.code.value, form.name.value);
    form.code.value = '';
    form.name.value = '';
    form.code.focus();
})