class Linker {
    constructor (selector, linker) {
        this._listeMedLinker = document.querySelector(selector);
        this._linker = linker;
    }

    visLinker(){
        this._listeMedLinker.innerHTML = '';
        this._linker.forEach(link => {
            const li = document.createElement('LI');
            li.innerHTML = link.url + " " + link.tittel + " " + link.beskrivelse;
            this._listeMedLinker.appendChild(li);
        });
    }

    nyLink(form){
        const link = new Link(  form.url.value,
                                form.tittel.value,
                                form.beskrivelse.value);
        this._linker.push(link);
        this.visLinker();
    }
}