



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