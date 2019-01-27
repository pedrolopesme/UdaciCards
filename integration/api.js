import { AsyncStorage } from 'react-native';
import initialData from '../utils/initialData';

export const APP_STORAGE_DECKS_KEY = 'UdaciCardsApp:Decks';
export const APP_STORAGE_NOTIFICATION_KEY = 'UdaciCardsApp:Notifications';

function setInitialData() {
    AsyncStorage.setItem(APP_STORAGE_DECKS_KEY, JSON.stringify(initialData));
    return initialData;
}

/**
 * Return all of the decks along with their titles, questions, and answers.
 */
export function getDecks() {
    return AsyncStorage.getItem(APP_STORAGE_DECKS_KEY)
        .then(results =>
            results !== null ? JSON.parse(results) : setInitialData()
        ).then(results =>
            Object.keys(results).map(key => results[key])
        );
}

/**
 * Take in a single id argument and return the deck associated with that id
 * 
 * @param {string} item 
 */
export function getDeck(id) {
    return AsyncStorage.getItem(APP_STORAGE_DECKS_KEY)
        .then(results =>
            results !== null ? JSON.parse(results) : setInitialData())
        .then(results => results[id]);
}

/**
 * Take in a single dock and add it to the decks. 
 * 
 * @param {string} title 
 * @param {string} key 
 */
export function saveDeck(title, key) {
    return AsyncStorage.mergeItem(
        APP_STORAGE_DECKS_KEY,
        JSON.stringify({
            [key]: {
                key,
                title,
                questions: [],
            }
        }),
    );
}

/**
 * take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title
 * 
 * @param {string} title 
 * @param {string} content 
 */
export function addCardToDeck(deckId, card) {
    return AsyncStorage.getItem(APP_STORAGE_DECKS_KEY).then(data => {
        decks = JSON.parse(data);
        decks[deckId].questions.push(card);
        AsyncStorage.setItem(APP_STORAGE_DECKS_KEY, JSON.stringify(decks))
        return decks[deckId];
    });
}

/**
 * Get notification from storage
 *
 */
export function getNotification() {
    return AsyncStorage.getItem(APP_STORAGE_NOTIFICATION_KEY).then(data =>
        JSON.parse(data));
}

/**
 * Remove notification from storage
 *
 */
export function removeNotification() {
    return AsyncStorage.removeItem(APP_STORAGE_NOTIFICATION_KEY);
}

/**
 * Sets a notification entry into storage
 *
 */
export function setNotification() {
    return AsyncStorage.setItem(APP_STORAGE_NOTIFICATION_KEY, JSON.stringify({ scheduled: true }));
}