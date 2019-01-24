import { AsyncStorage } from 'react-native';
import initialData from '../utils/initialData';

export const APP_STORAGE_KEY = 'UdaciCards:AppDecks';

function setInitialData() {
    AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
}

/**
 * Return all of the decks along with their titles, questions, and answers.
 */
export function getDecks() {
    return AsyncStorage.getItem(APP_STORAGE_KEY)
        .then(results =>
            results !== null ? JSON.parse(results) : setInitialData());
}

/**
 * Take in a single id argument and return the deck associated with that id
 * 
 * @param {string} item 
 */
export function getDeck(id) {
    return AsyncStorage.getItem(APP_STORAGE_KEY)
        .then(results =>
            results !== null ? JSON.parse(results) : setInitialData())
        .then(results => results[id]);
}

/**
 * Take in a single title argument and add it to the decks. 
 * 
 * @param {string} title 
 * @param {string} key 
 */
export function saveDeckTitle(title, key) {
    return AsyncStorage.mergeItem(
        UDACICARDS_STORAGE_KEY,
        JSON.stringify({
            [title]: {
                title,
                questions: [],
            },
        }),
    );
}

/**
 * take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title
 * 
 * @param {string} title 
 * @param {string} content 
 */
export function addCardToDeck(title, content) {
    return AsyncStorage.getItem(APP_STORAGE_KEY).then(data => {
        decks = JSON.parse(data);
        decks[title].questions.push(content);
        AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(decks));
    });
}

