module.exports = class Word {
    /**
     * Represents a word in two languages.
     * 
     * @param {string} local Local version of the word.
     * @param {strings} foreign Foreign version of the word.
     * @param {string} id ID of the word.
     * @param {number} learn Level of learn.
     */
    constructor(local, foreign, id, learn) {
        this.id = id;
        this.local = local;
        this.foreign = foreign;
        this.learn = learn;
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

    get getLearn() {
        return this.learn;
    }

    toString() {
        return "{ foreign: '" + this.foreign + "' local: '" + this.local + "' learn: " + this.learn + "}";
    }
}