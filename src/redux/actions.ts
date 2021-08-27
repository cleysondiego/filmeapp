import { Dispatch } from 'redux';

import { api } from '../services/api';
import { IAction } from '../types/IAction';
import { IMovie } from '../types/IMovie';

import { ADD_MOVIE, REMOVE_MOVIE } from './actionTypes';

export const addMovie = (movie: IMovie) => (
  {
    type: ADD_MOVIE,
    payload: movie,
  } as IAction
);

export const removeMovie = (movie: IMovie) => (
  {
    type: REMOVE_MOVIE,
    payload: movie,
  } as IAction
);

export function getMovieInfo(id: number) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.get<IMovie>(`/movie/${id}`);

      setTimeout(() => {
        dispatch(addMovie(response.data));

        return;
      }, 2000);

      // dispatch(addMovie(response.data));
      // return;
    } catch(error) {
      console.error(error);
    }
  }
}
