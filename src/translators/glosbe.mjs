import fetch from 'node-fetch';

/**
 * See: https://glosbe.com/
 */
export default ({ from = 'swe', to = 'eng' }) => {
  const translate = (phrase) => {
    const url = `https://glosbe.com/gapi/translate?from=${from}&dest=${to}&format=json&phrase=${encodeURIComponent(phrase)}`;

    return fetch(url).then(res => res.json());
  };

  const formatResult = (result) => {
    return {
      from,
      to,
      result,
      words: result.tuc ? result.tuc.filter(tuc => tuc.phrase).map(tuc => tuc.phrase.text) : [],
      meaning: result.tuc && result.tuc[0] && result.tuc[0].meanings ? result.tuc[0].meanings[0].text : 'No meaning available.'
    };
  };

  const resultToString = (result, word, format = 'simple') => {
    let formatted = formatResult(result);

    if (format === 'simple') {
      const wordExamples = formatted.words.slice(0, 3).join(', ');

      return `${word.word} (${word.frequencyCount}). ${formatted.meaning} ${wordExamples && `Examples: ${wordExamples}`}.`;
    }
  };

  return {
    translate,
    formatResult,
    resultToString
  };
};
