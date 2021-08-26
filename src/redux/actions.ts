import { IMovieItem } from '../types/IMovie';

import { ADD_MOVIE, REMOVE_MOVIE } from './actionTypes';

interface IAction {
  type: typeof ADD_MOVIE | typeof REMOVE_MOVIE;
  payload: IMovieItem;
}

export const addMovie = (movie: IMovieItem) => (
  {
    type: ADD_MOVIE,
    payload: movie,
  } as IAction
);

export const removeMovie = (movie: IMovieItem) => (
  {
    type: REMOVE_MOVIE,
    payload: movie,
  } as IAction
);
