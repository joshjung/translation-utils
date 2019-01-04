import fetch from 'node-fetch';

const PUNCTUATION = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g;

const getIndividualWords = (texts) => {
  return texts.join(' ').replace(PUNCTUATION, ' ').split(/\s/g).filter(w => w.trim() !== '');
};

const wordCountAndSort = ({ texts, log }) => {
  let words = getIndividualWords(texts);

  let wordMap = {};

  words.forEach(w => {
    wordMap[w] = wordMap[w] || 0;
    wordMap[w]++;
  });

  words = Object.keys(wordMap).map(word => ({frequencyCount: wordMap[word], word}));
  words.sort((a, b) => b.frequencyCount - a.frequencyCount);

  if (log) {
    console.log(words);
  }

  return words;
};

const translateAll = ({ texts, from = 'swe', to = 'eng', log }) => {
  let words = wordCountAndSort({ texts, log: false });

  const wordPromises = words.map(w => {
    const url = `https://glosbe.com/gapi/translate?from=${from}&dest=${to}&format=json&phrase=${encodeURIComponent(w.word)}`;
    return fetch(url)
      .then(res => res.json())
  });

  return Promise.all(wordPromises).then(results => {

    words = words.map((w, ix) => ({
      translation: {
        from,
        to,
        full: results[ix],
        words: results[ix].tuc ? results[ix].tuc.filter(tuc => tuc.phrase).map(tuc => tuc.phrase.text) : [],
        meaning: results[ix].tuc && results[ix].tuc[0] ? results[ix].tuc[0].meanings[0].text : 'No meaning available.'
      },
      ...w
    }));

    if (log) {
      words.forEach(word => {
        const wordExamples = word.translation.words.slice(0, 3).join(', ');

        console.log(`${word.word} (${word.frequencyCount}). Meaning: ${word.translation.meaning}. ${wordExamples && `Examples: ${wordExamples}`}.`);
      });
    }

    return words;
  });
};

export default {
  wordCountAndSort,
  translateAll
};