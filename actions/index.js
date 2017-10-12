import {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
  removeEntry
} from '../utils/helpers';

export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';

const receiveDecks = decks => ({
  type: GET_DECKS,
  decks
});

const savedDeckTitle = decks => ({
  type: SAVE_DECK_TITLE,
  decks
})

export const fetchDecks = () => dispatch => {
  getDecks().then((decks) => {
    dispatch(receiveDecks(JSON.parse(decks)));
  }).catch(err => console.log('Error: ', err));
}

export const sendDeckTitle = (title) => dispatch => {
  saveDeckTitle(title).then(() => {
    getDecks().then((decks) => {
      dispatch(savedDeckTitle(JSON.parse(decks)));
    }).catch(err => console.log('Error ', err));
  })
}

export const sendCardToDeck = (title, card) => dispatch => {
  addCardToDeck(title, card).then(() => {
    fetchDecks()(dispatch);
  })
}

export const deleteDeck = (title) => dispatch => {
  removeEntry(title).then(() => {
    fetchDecks()(dispatch);
  })
}