import { getIndividualWords } from '../utils/string.mjs';

/**
 * Take in an array of documents and find and count every word and return a sorted array of the
 * words.
 *
 * Example:
 *
 *     wordCountAndSort({ documents: ['hello world, this is josh', 'hello world'] });
 *
 * Return:
 *
 *     [
 *       { frequencyCount: 2, word: 'hello' },
 *       { frequencyCount: 2, word: 'world' },
 *       { frequencyCount: 1, word: 'this' },
 *       { frequencyCount: 1, word: 'is' },
 *       { frequencyCount: 1, word: 'josh' },
 *     ]
 */
export default ({ documents, log = false }) => {
  let words = getIndividualWords(documents);

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