exports.filterWords = function(words) {
    let filteredWords = [];
    console.log(words);
    words.forEach((word) => {
        if (!filteredWords.includes(word.toLowerCase())) {
            filteredWords.push(word.toLowerCase());
        }
    });
    return filteredWords;
}