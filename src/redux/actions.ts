import { Dispatch } from 'redux';

import { api } from '../services/api';
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

export function getMovieInfo(id: number) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.get<IMovieItem>(`/movie/${id}`);

      setTimeout(() => {
        dispatch(addMovie(response.data));

        return response;
      }, 2000);

      // dispatch(addMovie(response.data));
      // return response;
    } catch(error) {
      console.error(error);
    }
  }
}
