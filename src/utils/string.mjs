/**
 * All standard punctuation used in most western languages to delineate words.
 *
 * @type {RegExp}
 */
const PUNCTUATION = /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g;

/**
 * Take in an array of Strings and return all individual words, without removing duplicates.
 *
 * @param documents
 */
export let getIndividualWords = (documents) => {
  return documents.join(' ').replace(PUNCTUATION, ' ').split(/\s/g).filter(w => w.trim() !== '');
};