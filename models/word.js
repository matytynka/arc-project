module.exports = class Word {
    /**
     * Represents a word in two languages.
     * 
     * @param {string} local Local version of the word.
     * @param {strings} foreign Foreign version of the word.
     * @param {string} id ID of the word.
     */
    constructor(local, foreign, id) {
        if (id === undefined) this.id = "";
        else this.id = id;
        this.local = local;
        this.foreign = foreign;
    }

    get getId() {
        return this.id;
    }

    get getLocal() {
        return this.local;
    }

    get getForeign() {
        return this.foreign;
    }

    toString() {
        return "{ foreign: '" + this.foreign + "' local: '" + this.local + "' }";
    }
}