class Link {
    constructor(url, tittel, beskrivelse){
        this._url = url;
        this._tittel = tittel;
        this._beskrivelse = beskrivelse;
    }

    get url(){
        return this._url;
    }

    get tittel(){
        return this._tittel;
    }

    get beskrivelse(){
        return this._beskrivelse;
    }

    set url(url){
        this._url = url;
    }

    set tittel(tittel){
        this._tittel = tittel;
    }

    set beskrivelse(beskrivelse){
        this._beskrivelse = beskrivelse;
    }
}