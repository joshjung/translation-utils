import translators from '../translators/index.mjs';
import wordCountAndSort from './wordCountAndSort.mjs';

/**
 * Take in a set of documents, pass them through wordCountAndSort, and then translate all of the
 * words using the provided translator.
 *
 * Result is an array of word objects sorted in the order of their frequency with most frequent first.
 * The word objects should look like:
 *
 *     [{
 *       frequencyCount,
 *       word,
 *       translation: {
 *         from,
 *         to,
 *         result,
 *         words,
 *         meaning
 *       }
 *     }...]
 *
 * @param documents An array of strings to translate.
 * @param from Source language.
 * @param to Target language.
 * @param translator The translator to use, see translators.mjs. Default is 'glosbe'.
 * @param log When true, detailed logs will be output to the console.
 *
 * @returns {Promise.<TResult>}
 */
export default ({ documents, from = 'swe', to = 'eng', translateAPI = 'glosbe', log = false }) => {
  let words = wordCountAndSort({ documents, log: false });
  let translator = translators[translateAPI](from, to);

  const translationPromises = words.map(w => translator.translate(w.word));

  return Promise.all(translationPromises).then(results => {

    words = words.map((w, ix) => {
      const result = results[ix];

      if (log) {
        console.log(translator.resultToString(result, w));
      }

      return { translation: translator.formatResult(result), ...w };
    });

    return words;
  });
};