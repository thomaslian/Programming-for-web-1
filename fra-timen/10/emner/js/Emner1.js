class Emner {
    constructor (selector) {
        this._selector = selector;
        this.emner = [];
        const json = localStorage.getItem('emner');
        if (json!=null){
            this.emner = JSON.parse(json);
        }
        this.visEmner();
    }

    visEmner() {
        const emner = document.querySelector(this._selector);
        emner.innerHTML = '';
        this.emner.forEach(emne => {
            const li = document.createElement('LI');
            li.innerHTML = `${emne.emnekode} ${emne.emnenavn}`;
            emner.appendChild(li);
        });
    }

    leggTilEmne(kode, navn){
        const emne = {
            emnekode: kode,
            emnenavn: navn
        }
        this.emner.push(emne);
        this.visEmner();
        localStorage.setItem('emner', JSON.stringify(this.emner));
    }
}

const emner = new Emner('ul.emner');