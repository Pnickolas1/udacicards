import {
    GET_DECKS,
    SAVE_DECK_TITLE 
  } from '../actions';
  
  function decks(state = {}, action) {
    switch(action.type) {
      case GET_DECKS:
        return { ...action.decks }
  
      case SAVE_DECK_TITLE:
        return { ...state, ...action.decks }
  
      default:
        return state
    }
  }
  
  export default decks;
  