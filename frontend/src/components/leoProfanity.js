import leoProfanity from 'leo-profanity';
// remove all bad words from the filter
// now the filter can't filter anything cause there are no bad words
leoProfanity.clearList();

// adding word (from builtin dictionary) into the filter
leoProfanity.add(leoProfanity.getDictionary('en'));
leoProfanity.add(leoProfanity.getDictionary('ru'));

export default leoProfanity;
