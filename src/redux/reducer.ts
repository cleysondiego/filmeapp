import { combineReducers } from 'redux';

import { IAction } from '../types/IAction';
import { IMovie } from '../types/IMovie';

import { ADD_MOVIE, REMOVE_MOVIE } from './actionTypes';

const INITIAL_STATE = {
  cart: [] as IMovie[],
}

const cartReducer = (state = INITIAL_STATE, action: IAction) => {
  switch(action.type) {
    case ADD_MOVIE:
      const isExists = state.cart.find(movie => movie.id === action.payload.id);

      if (isExists) {
        return state;
      }

      const movie = action.payload;

      return {
        cart: [...state.cart, movie],
      }

    case REMOVE_MOVIE:
      const newArray = state.cart.filter((movie) => {
        return movie.id != action.payload.id;
      });

      return {
        cart: newArray
      }
    default:
      return state;
  }
}

export default combineReducers({
  cart: cartReducer,
});
