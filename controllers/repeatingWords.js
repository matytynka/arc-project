exports.filterWords = function(words) {
    let filteredWords = [];
    let forbiddenWords = ["el", "la", "en", "del", "a", "y", "los", "las", "unos", "unas", "uno", "una", "con", "que", "de", "me", "te", "se", "nos", "os", "o"];
    console.log(words);
    words.forEach((word) => {
        if (!filteredWords.includes(word.toLowerCase()) && !forbiddenWords.includes(word.toLowerCase())) {
            filteredWords.push(word.toLowerCase());
        }
    });
    return filteredWords;
}