exports.repeatingWordsHandler = function (req, res) { return filterWords(req, res); }

function filterWords(req, res) {
    const words = req.body;
    let filteredWords = [];

    words.forEach((word) => {
        if (!filteredWords.includes(word.toLowerCase())) {
            filteredWords.push(word.toLowerCase());
        }
    });
    return filteredWords;
}