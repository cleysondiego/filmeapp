import { combineReducers } from "redux";
import { IMovieItem } from "../types/IMovie";
import { ADD_MOVIE, REMOVE_MOVIE } from "./actionTypes";

interface IAction {
  type: typeof ADD_MOVIE | typeof REMOVE_MOVIE;
  payload: IMovieItem;
}

const INITIAL_STATE = {
  cart: [] as IMovieItem[],
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
